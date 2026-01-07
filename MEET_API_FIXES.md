# Google Meet API Issues Found & Fixed

## Issues Found (Compared to Google Documentation)

### 1. **Wrong Target Resource Format** ❌ → ✅

**What we had:**

```typescript
// Trying to subscribe to a specific conference record
targetResource: `//meet.googleapis.com/conferenceRecords/{conferenceId}`;
```

**What Google Docs Say:**
According to [Subscribe to Google Meet events](https://developers.google.com/workspace/meet/api/guides/subscribe-to-events), you can only subscribe to:

- **Meeting Space**: `//meet.googleapis.com/spaces/SPACE_ID`
- **User**: `//cloudidentity.googleapis.com/users/USER_ID`

You **cannot** subscribe directly to individual conference records. Instead, subscribe to the space, and you'll receive events for all conferences in that space.

**Fixed in:** `src/services/WorkspaceEventsService.ts` - Updated docstring to clarify.

---

### 2. **Incorrect Event Payload Structure** ❌ → ✅

**What we expected:**

```javascript
{
  "eventType": "google.workspace.meet.participant.v2.joined",
  "participant": {
    "userId": "...",
    "name": "...",
    "email": "..."
  }
}
```

**What Google Actually Sends:**
According to the docs, participant events have this structure:

```javascript
{
  "eventType": "google.workspace.meet.participant.v2.joined",
  "participantSession": {
    "name": "conferenceRecords/CONFERENCE_RECORD_ID/participants/PARTICIPANT_ID/participantSessions/PARTICIPANT_SESSION_ID"
  }
}
```

**Key Differences:**

- Field is `participantSession`, not `participant`
- It only contains a `name` field with the full resource path
- No direct access to `userId`, `name`, or `email` in the webhook payload
- These details must be fetched from the Meet API using the resource name

**Fixed in:**

- `src/services/WorkspaceEventsService.ts` - `parsePubSubMessage()` now correctly extracts `conferenceRecord` and `participantId` from the resource path
- `pages/api/meet/participants-webhook.ts` - Updated to use `participantId` and `participantSession` instead of `participant` fields

---

### 3. **Missing Error Handling for Participant Join Before Subscription** ❌ → ✅

**Issue:**
When a subscription starts, participants who joined before the subscription was active won't have a "joined" event. If they leave, we get a "left" event for someone we never tracked.

**Fixed in:** `pages/api/meet/participants-webhook.ts`

- Now handles the case where we receive a `PARTICIPANT_LEFT` for an unknown participant ID
- Creates a record for them with status "left" to indicate they were never tracked

---

## Updated Event Flow

```
Google Workspace Events API
         ↓
Pub/Sub Topic receives message
         ↓
Your Webhook: /api/meet/participants-webhook
         ↓
parsePubSubMessage():
  - Extracts conferenceRecord from participantSession.name
  - Extracts participantId from resource path
  - Returns parsed event
         ↓
participantsStore updated with:
  {
    id: participantId,
    participantSessionName: "conferenceRecords/.../participants/.../participantSessions/...",
    joinedAt/leftAt: timestamp,
    status: "joined" | "left"
  }
```

---

## Important Notes

### Participant Details

The Workspace Events API payload includes **limited data** about participants. To get full details (displayName, email), you must:

1. Use the resource path from the event: `conferenceRecords/X/participants/Y/participantSessions/Z`
2. Call the Google Meet API endpoint: `GET /v2/{parent}/participants`
3. Parse the resource names to extract IDs

### Event Types Used

```typescript
-google.workspace.meet.participant.v2.joined -
  google.workspace.meet.participant.v2.left;
```

### Subscription Target Resource

Change from conference-specific to space-specific:

```typescript
// Subscribe to ALL conferences in a space
targetResource: "//meet.googleapis.com/spaces/SPACE_ID";

// NOT a conference record
// targetResource: "//meet.googleapis.com/conferenceRecords/{id}"  ❌
```

---

## References

- [Subscribe to Google Meet events](https://developers.google.com/workspace/meet/api/guides/subscribe-to-events)
- [Google Workspace Events API](https://developers.google.com/workspace/events)
- [Meet Conference Records](https://developers.google.com/workspace/meet/api/reference/rest/v2/conferenceRecords)
