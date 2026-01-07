import { NextApiRequest, NextApiResponse } from "next";
import { participantsStore } from "./participants-webhook";

// SSE endpoint for real-time participant updates
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { conferenceId } = req.query;

  if (!conferenceId || typeof conferenceId !== "string") {
    return res.status(400).json({ error: "conferenceId is required" });
  }

  // Set headers for SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const conferenceRecord = `//meet.googleapis.com/conferenceRecords/${conferenceId}`;

  // Send initial participants list
  const initialParticipants = participantsStore.get(conferenceRecord) || [];
  res.write(
    `data: ${JSON.stringify({
      type: "initial",
      participants: initialParticipants,
    })}\n\n`
  );

  // Poll for updates every 2 seconds
  const intervalId = setInterval(() => {
    const participants = participantsStore.get(conferenceRecord) || [];
    res.write(
      `data: ${JSON.stringify({
        type: "update",
        participants,
      })}\n\n`
    );
  }, 2000);

  // Clean up on client disconnect
  req.on("close", () => {
    clearInterval(intervalId);
    res.end();
  });
}
