# Google Meet Participants Subscription

This implementation provides real-time tracking of Google Meet participants using the Google Workspace Events API.

## Architecture

### Components Created

1. **Types** (`src/types/meet-events.ts`)

   - TypeScript interfaces for subscriptions, participants, and events
   - Event type constants

2. **Service** (`src/services/WorkspaceEventsService.ts`)

   - WorkspaceEventsService class for managing subscriptions
   - Pub/Sub message parsing utilities

3. **API Routes**

   - `/api/meet/subscriptions` - Create, list, and delete subscriptions
   - `/api/meet/participants-webhook` - Webhook to receive Pub/Sub notifications
   - `/api/meet/participants` - Get current participants list
   - `/api/meet/participants-sse` - Server-Sent Events for real-time updates

4. **React Hooks** (`src/shared/hooks/useMeetParticipants.ts`)

   - Custom hook for subscribing to participant changes
   - Supports both SSE and polling modes
   - Automatic subscription management

5. **Component** (`src/components/MeetParticipantsList.tsx`)
   - Example React component displaying participants list
   - Shows active and left participants

## Setup

### 1. Environment Variables

Add to your `.env.local`:

```env
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
NEXT_PUBLIC_PUBSUB_TOPIC=projects/your-project/topics/meet-events
```

### 2. Google Cloud Setup

1. **Enable APIs**:

   - Google Workspace Events API
   - Google Meet API
   - Cloud Pub/Sub API

2. **Create Pub/Sub Topic**:

   ```bash
   gcloud pubsub topics create meet-events
   ```

3. **Create Pub/Sub Subscription** (for webhook):

   ```bash
   gcloud pubsub subscriptions create meet-events-webhook \
     --topic=meet-events \
     --push-endpoint=https://your-domain.com/api/meet/participants-webhook
   ```

4. **Grant Permissions**:
   - Workspace Events API needs domain-wide delegation
   - OAuth scopes: `https://www.googleapis.com/auth/meetings.space.readonly`

### 3. Install Dependencies

```bash
npm install googleapis google-auth-library
```

## Usage

### Basic Hook Usage

```typescript
import { useMeetParticipants } from "@/shared/hooks/useMeetParticipants";

function MyComponent() {
  const { participants, loading, error, subscribe, unsubscribe } =
    useMeetParticipants({
      conferenceId: "your-conference-id",
      accessToken: "user-access-token",
      enableRealtime: true, // Use SSE for real-time updates
    });

  // Create subscription on mount
  useEffect(() => {
    subscribe();
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {participants.map((p) => (
        <div key={p.id}>
          {p.name} - {p.status}
        </div>
      ))}
    </div>
  );
}
```

### Using the Component

```typescript
import { MeetParticipantsList } from "@/components/MeetParticipantsList";

function App() {
  return (
    <MeetParticipantsList
      conferenceId="your-conference-id"
      accessToken="user-access-token"
      autoSubscribe={true}
    />
  );
}
```

### Manual API Calls

```typescript
// Create subscription
const response = await fetch("/api/meet/subscriptions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
  body: JSON.stringify({
    conferenceId: "your-conference-id",
    pubsubTopic: "projects/your-project/topics/meet-events",
  }),
});

// Get participants
const participants = await fetch(
  `/api/meet/participants?conferenceId=your-conference-id`,
  {
    headers: { Authorization: `Bearer ${accessToken}` },
  }
);
```

## Event Flow

1. **Subscription Creation**:

   - Client calls `/api/meet/subscriptions` with conference ID
   - Server creates subscription via Workspace Events API
   - Subscription is linked to Pub/Sub topic

2. **Event Reception**:

   - Participant joins/leaves meeting
   - Google sends event to Pub/Sub topic
   - Pub/Sub pushes to `/api/meet/participants-webhook`
   - Webhook updates participants store

3. **Real-time Updates**:
   - Client connects to `/api/meet/participants-sse`
   - Server streams participant updates via SSE
   - Client receives real-time participant changes

## Event Types

- `google.workspace.meet.participant.v2.joined` - Participant joins
- `google.workspace.meet.participant.v2.left` - Participant leaves

## Production Considerations

1. **Replace In-Memory Store**: Use Redis, PostgreSQL, or Firebase instead of `participantsStore` Map
2. **Authentication**: Implement proper OAuth2 flow for access tokens
3. **Webhook Security**: Verify Pub/Sub messages using JWT validation
4. **Rate Limiting**: Add rate limiting to API endpoints
5. **Error Handling**: Implement retry logic and dead-letter queues
6. **Monitoring**: Add logging and monitoring for subscriptions
7. **Cleanup**: Implement automatic subscription cleanup for ended meetings

## Troubleshooting

- **No events received**: Check Pub/Sub subscription and webhook endpoint
- **401 errors**: Verify OAuth2 token has correct scopes
- **404 on webhook**: Ensure Next.js is configured to handle the webhook route
- **SSE disconnects**: Check server timeout settings and implement reconnection logic
