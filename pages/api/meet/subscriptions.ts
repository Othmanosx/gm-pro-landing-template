import { NextApiRequest, NextApiResponse } from "next";
import { OAuth2Client } from "google-auth-library";
import { WorkspaceEventsService } from "../../../src/services/WorkspaceEventsService";
import { MEET_EVENT_TYPES } from "../../../src/types/meet-events";

// Initialize OAuth2 client - replace with your actual credentials
function getAuthClient(accessToken: string): OAuth2Client {
  const client = new OAuth2Client(
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
  );
  client.setCredentials({ access_token: accessToken });
  return client;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  try {
    // Get access token from request (adjust based on your auth implementation)
    const accessToken = req.headers.authorization?.replace("Bearer ", "");
    if (!accessToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const authClient = getAuthClient(accessToken);
    const service = new WorkspaceEventsService(authClient);

    switch (method) {
      case "POST": {
        // Create a new subscription
        const { conferenceId, pubsubTopic } = req.body;

        if (!conferenceId || !pubsubTopic) {
          return res.status(400).json({
            error: "conferenceId and pubsubTopic are required",
          });
        }

        const targetResource = `//meet.googleapis.com/conferenceRecords/${conferenceId}`;
        const eventTypes = [
          MEET_EVENT_TYPES.PARTICIPANT_JOINED,
          MEET_EVENT_TYPES.PARTICIPANT_LEFT,
        ];

        const subscription = await service.createSubscription(
          targetResource,
          eventTypes,
          pubsubTopic
        );

        return res.status(201).json(subscription);
      }

      case "GET": {
        // List subscriptions
        const { filter } = req.query;
        const subscriptions = await service.listSubscriptions(
          filter as string | undefined
        );
        return res.status(200).json(subscriptions);
      }

      case "DELETE": {
        // Delete a subscription
        const { subscriptionName } = req.query;
        if (!subscriptionName) {
          return res
            .status(400)
            .json({ error: "subscriptionName is required" });
        }

        await service.deleteSubscription(subscriptionName as string);
        return res.status(204).end();
      }

      default:
        res.setHeader("Allow", ["GET", "POST", "DELETE"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error: any) {
    console.error("Subscription API error:", error);
    return res.status(500).json({
      error: error.message || "Internal server error",
    });
  }
}
