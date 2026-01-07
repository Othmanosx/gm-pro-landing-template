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
   * Requires a Cloud Pub/Sub topic for notifications
   */
  async createSubscription(
    targetResource: string, // e.g., "//meet.googleapis.com/conferenceRecords/{conferenceId}"
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
 */
export function parsePubSubMessage(message: any): any | null {
  try {
    const data = Buffer.from(message.data, "base64").toString();
    const event = JSON.parse(data);

    return {
      eventType: event.eventType,
      conferenceRecord: event.conferenceRecord?.name,
      participant: event.participant,
      timestamp: event.eventTimestamp || new Date().toISOString(),
    };
  } catch (error) {
    console.error("Failed to parse Pub/Sub message:", error);
    return null;
  }
}
