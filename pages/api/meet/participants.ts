import { NextApiRequest, NextApiResponse } from "next";
import { participantsStore } from "./participants-webhook";
import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";

// Initialize OAuth2 client
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
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { conferenceId, source = "cache" } = req.query;

    if (!conferenceId || typeof conferenceId !== "string") {
      return res.status(400).json({ error: "conferenceId is required" });
    }

    // Option 1: Get from cache (fast, but requires webhook to be active)
    if (source === "cache") {
      const conferenceRecord = `//meet.googleapis.com/conferenceRecords/${conferenceId}`;
      const participants = participantsStore.get(conferenceRecord) || [];
      console.log("[PARTICIPANTS] Cache request:", {
        conferenceId,
        conferenceRecord,
        participantsCount: participants.length,
        storeKeys: Array.from(participantsStore.keys()),
      });
      return res.status(200).json({ participants });
    }

    // Option 2: Fetch from Google Meet API (slower, but always up-to-date)
    console.log(
      "[PARTICIPANTS] Fetching from Google Meet API for:",
      conferenceId
    );
    const accessToken = req.headers.authorization?.replace("Bearer ", "");
    if (!accessToken) {
      console.log("[PARTICIPANTS] No access token provided");
      return res.status(401).json({ error: "Unauthorized" });
    }

    const authClient = getAuthClient(accessToken);
    const meet = google.meet("v2");

    // List participants from the conference
    const response = await meet.conferenceRecords.participants.list({
      auth: authClient,
      parent: `conferenceRecords/${conferenceId}`,
    });

    const participants = (response.data.participants || []).map((p: any) => ({
      id: p.name?.split("/").pop(),
      name: p.signedinUser?.displayName || p.anonymousUser?.displayName,
      email: p.signedinUser?.user,
      joinedAt: p.earliestStartTime,
      leftAt: p.latestEndTime,
      status: p.latestEndTime ? "left" : "joined",
    }));

    console.log(
      "[PARTICIPANTS] Fetched from API:",
      participants.length,
      "participants"
    );
    return res.status(200).json({ participants });
  } catch (error: any) {
    console.error("Get participants error:", error);
    return res.status(500).json({
      error: error.message || "Internal server error",
    });
  }
}
