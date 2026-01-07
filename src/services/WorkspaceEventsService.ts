import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import { Subscription } from "../types/meet-events";

const workspaceEvents = google.workspaceevents("v1");

export class WorkspaceEventsService {
  private authClient: OAuth2Client;

  constructor(authClient: OAuth2Client) {
    this.authClient = authClient;
  }

  /**
   * Create a subscription to Google Meet participant events
   *
   * IMPORTANT: targetResource should be a Meeting Space or User, NOT a conference record:
   * - Meeting Space: "//meet.googleapis.com/spaces/SPACE_ID"
   * - User: "//cloudidentity.googleapis.com/users/USER_ID"
   *
   * When you subscribe to a space, you receive events for all conferences in that space.
   * When you subscribe to a user, you receive events for spaces where the user is the owner.
   *
   * Requires a Cloud Pub/Sub topic for notifications
   */
  async createSubscription(
    targetResource: string, // e.g., "//meet.googleapis.com/spaces/SPACE_ID"
    eventTypes: string[],
    pubsubTopic: string // e.g., "projects/my-project/topics/meet-events"
  ): Promise<Subscription> {
    const response = await workspaceEvents.subscriptions.create({
      auth: this.authClient,
      requestBody: {
        targetResource,
        eventTypes,
        notificationEndpoint: {
          pubsubTopic,
        },
      },
    });

    return this.formatSubscription(response.data);
  }

  /**
   * List existing subscriptions
   */
  async listSubscriptions(filter?: string): Promise<Subscription[]> {
    const response = await workspaceEvents.subscriptions.list({
      auth: this.authClient,
      filter, // e.g., "state = 'ACTIVE'"
    });

    return (response.data.subscriptions || []).map((sub) =>
      this.formatSubscription(sub)
    );
  }

  /**
   * Get a specific subscription
   */
  async getSubscription(subscriptionName: string): Promise<Subscription> {
    const response = await workspaceEvents.subscriptions.get({
      auth: this.authClient,
      name: subscriptionName,
    });

    return this.formatSubscription(response.data);
  }

  /**
   * Update subscription (e.g., change event types)
   */
  async updateSubscription(
    subscriptionName: string,
    updates: {
      eventTypes?: string[];
      notificationEndpoint?: { pubsubTopic: string };
    }
  ): Promise<Subscription> {
    const response = await workspaceEvents.subscriptions.patch({
      auth: this.authClient,
      name: subscriptionName,
      requestBody: updates,
    });

    return this.formatSubscription(response.data);
  }

  /**
   * Delete a subscription
   */
  async deleteSubscription(subscriptionName: string): Promise<void> {
    await workspaceEvents.subscriptions.delete({
      auth: this.authClient,
      name: subscriptionName,
    });
  }

  /**
   * Reactivate a suspended subscription
   */
  async reactivateSubscription(
    subscriptionName: string
  ): Promise<Subscription> {
    const response = await workspaceEvents.subscriptions.reactivate({
      auth: this.authClient,
      name: subscriptionName,
    });

    return this.formatSubscription(response.data);
  }

  private formatSubscription(data: any): Subscription {
    return {
      name: data.name,
      uid: data.uid,
      targetResource: data.targetResource,
      eventTypes: data.eventTypes || [],
      notificationEndpoint: data.notificationEndpoint || {},
      state: data.state,
      createTime: data.createTime,
      updateTime: data.updateTime,
    };
  }
}

/**
 * Parse Pub/Sub message for participant events
 *
 * CRITICAL: Your Pub/Sub subscription has "Push payload unwrapping: Disabled"
 * This means messages come in CloudEvents format:
 * - Event type is in message.attributes["ce-type"]
 * - Payload is in message.data (base64 encoded)
 *
 * The payload structure according to Google docs:
 * - participantSession.name: "conferenceRecords/CONF_ID/participants/PART_ID/participantSessions/SESSION_ID"
 * - conferenceRecord.name: "conferenceRecords/CONF_ID"
 */
export function parsePubSubMessage(message: any): any | null {
  try {
    console.log("[parsePubSubMessage] Message attributes:", message.attributes);

    // Get event type from CloudEvents attributes (not from payload!)
    const eventType = message.attributes?.["ce-type"];
    console.log("[parsePubSubMessage] Event type from ce-type:", eventType);

    if (!eventType) {
      console.log("[parsePubSubMessage] ERROR: No ce-type in attributes");
      return null;
    }

    // Decode the base64 data payload
    let payload;
    if (typeof message.data === "string") {
      try {
        payload = JSON.parse(Buffer.from(message.data, "base64").toString());
      } catch {
        payload = JSON.parse(message.data);
      }
    } else if (Buffer.isBuffer(message.data)) {
      payload = JSON.parse(message.data.toString());
    } else {
      payload = message.data;
    }

    console.log(
      "[parsePubSubMessage] Decoded payload:",
      JSON.stringify(payload).substring(0, 300)
    );

    // Extract conferenceRecord and participantId from the appropriate field
    let conferenceRecord = null;
    let participantId = null;
    let participantSessionName = null;

    // For participant events: look in participantSession.name
    if (payload.participantSession?.name) {
      participantSessionName = payload.participantSession.name;
      // Format: conferenceRecords/CONF_ID/participants/PART_ID/participantSessions/SESSION_ID
      const parts = participantSessionName.split("/");
      if (parts[0] === "conferenceRecords" && parts.length >= 2) {
        conferenceRecord = `conferenceRecords/${parts[1]}`;
        participantId = parts[3]; // PARTICIPANT_ID
      }
    }
    // For conference events: look in conferenceRecord.name
    else if (payload.conferenceRecord?.name) {
      conferenceRecord = payload.conferenceRecord.name;
    }

    const parsedEvent = {
      eventType,
      conferenceRecord,
      participantSessionName,
      participantId,
      participantSession: payload.participantSession,
      conferenceRecordData: payload.conferenceRecord,
      timestamp: payload.eventTimestamp || new Date().toISOString(),
    };

    console.log("[parsePubSubMessage] Successfully parsed:", {
      eventType,
      conferenceRecord,
      participantId,
    });
    return parsedEvent;
  } catch (error) {
    console.error(
      "[parsePubSubMessage] Parse error:",
      error,
      "Message:",
      JSON.stringify(message).substring(0, 300)
    );
    return null;
  }
}
