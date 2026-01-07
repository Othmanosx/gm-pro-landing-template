import { NextApiRequest, NextApiResponse } from "next";
import { parsePubSubMessage } from "../../../src/services/WorkspaceEventsService";
import { MEET_EVENT_TYPES } from "../../../src/types/meet-events";

// Store participants in memory (in production, use a database)
const participantsStore = new Map<string, any[]>();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("[WEBHOOK] Received request:", {
    method: req.method,
    headers: req.headers,
    body: JSON.stringify(req.body).substring(0, 200),
  });

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // Parse the Pub/Sub message
    const message = req.body.message;
    if (!message) {
      console.log("[WEBHOOK] No message in request body");
      return res.status(400).json({ error: "No message provided" });
    }

    const event = parsePubSubMessage(message);
    if (!event) {
      console.log("[WEBHOOK] Failed to parse Pub/Sub message:", message);
      return res.status(400).json({ error: "Failed to parse message" });
    }

    const { eventType, conferenceRecord, participant, timestamp } = event;
    console.log("[WEBHOOK] Parsed event:", {
      eventType,
      conferenceRecord,
      participant,
      timestamp,
    });

    // Get or create participants list for this conference
    const participants = participantsStore.get(conferenceRecord) || [];
    console.log(
      "[WEBHOOK] Current participants for",
      conferenceRecord,
      ":",
      participants.length
    );

    if (eventType === MEET_EVENT_TYPES.PARTICIPANT_JOINED) {
      // Add participant
      const newParticipant = {
        id: participant.userId,
        name: participant.name,
        email: participant.email,
        joinedAt: timestamp,
        status: "joined",
      };
      participants.push(newParticipant);
      console.log("[WEBHOOK] Added participant:", newParticipant);
    } else if (eventType === MEET_EVENT_TYPES.PARTICIPANT_LEFT) {
      // Update participant status
      const existingParticipant = participants.find(
        (p: any) => p.id === participant.userId
      );
      if (existingParticipant) {
        existingParticipant.leftAt = timestamp;
        existingParticipant.status = "left";
        console.log("[WEBHOOK] Updated participant:", existingParticipant);
      } else {
        console.log(
          "[WEBHOOK] Participant not found for LEFT event:",
          participant.userId
        );
      }
    }

    participantsStore.set(conferenceRecord, participants);
    console.log(
      "[WEBHOOK] Updated store. Total participants:",
      participants.length
    );
    console.log("[WEBHOOK] Store keys:", Array.from(participantsStore.keys()));

    // In production, you might want to:
    // 1. Store in database
    // 2. Broadcast to connected WebSocket clients
    // 3. Send to Firebase Realtime Database
    // 4. Push to a message queue

    // Acknowledge the message
    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return res.status(500).json({ error: error.message });
  }
}

// Export the store for access from other endpoints
export { participantsStore };
