import { NextApiRequest, NextApiResponse } from "next";
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

interface Participant {
  id: string;
  name: string;
  email?: string;
  joinedAt?: string;
  leftAt?: string;
  status: "joined" | "left";
  type: "signed_in" | "anonymous" | "phone";
}

/**
 * Get conference record from various input formats
 * Accepts: meeting code (abc-defg-hij), space name (spaces/xxx), or conference record ID
 */
async function getConferenceRecord(
  meet: any,
  authClient: OAuth2Client,
  identifier: string
): Promise<string | null> {
  // If already a full conference record name
  if (identifier.startsWith("conferenceRecords/")) {
    return identifier;
  }

  // If it's a space name (spaces/xxx)
  if (identifier.startsWith("spaces/")) {
    try {
      const spaceResponse = await meet.spaces.get({
        auth: authClient,
        name: identifier,
      });

      // Get the active conference record from the space
      const conferenceRecord =
        spaceResponse.data.activeConference?.conferenceRecord;

      if (conferenceRecord) {
        // conferenceRecord comes in format: "conferenceRecords/xxx"
        return conferenceRecord;
      }

      // If no active conference, try to find the most recent conference for this space
      const space = spaceResponse.data.name; // e.g., "spaces/xxx"
      const recordsResponse = await meet.conferenceRecords.list({
        auth: authClient,
        filter: `space.name="${space}"`,
        pageSize: 1,
      });

      if (recordsResponse.data.conferenceRecords?.length > 0) {
        return recordsResponse.data.conferenceRecords[0].name;
      }
    } catch (error: any) {
      console.error("Error getting space:", error.message);
    }
  }

  // If it's a meeting code (abc-defg-hij), search for it
  if (identifier.includes("-")) {
    try {
      // Meeting codes are typically associated with spaces
      // We need to list spaces or conference records and find the matching code
      // Unfortunately, there's no direct API to get a conference by meeting code
      // We'll try to list recent conferences and find a match

      const recordsResponse = await meet.conferenceRecords.list({
        auth: authClient,
        pageSize: 50,
      });

      // Search through conference records to find one with matching space meeting code
      for (const record of recordsResponse.data.conferenceRecords || []) {
        if (record.space) {
          try {
            const spaceResponse = await meet.spaces.get({
              auth: authClient,
              name: record.space,
            });

            if (spaceResponse.data.meetingCode === identifier) {
              return record.name;
            }
          } catch (error) {
            // Skip if we can't access the space
            continue;
          }
        }
      }
    } catch (error: any) {
      console.error("Error searching by meeting code:", error.message);
    }
  }

  // Last resort: treat it as a conference record ID
  return `conferenceRecords/${identifier}`;
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
    const { meetingId, meetingCode, spaceName, pageSize, pageToken } =
      req.query;

    // Determine which identifier to use
    const identifier =
      (spaceName as string) || (meetingCode as string) || (meetingId as string);

    if (!identifier) {
      return res.status(400).json({
        error: "One of meetingId, meetingCode, or spaceName is required",
        examples: {
          meetingId: "?meetingId=abc-defg-hij-123",
          meetingCode: "?meetingCode=abc-defg-hij",
          spaceName: "?spaceName=spaces/SPACE_ID",
        },
      });
    }

    // Get access token from authorization header
    const accessToken = req.headers.authorization?.replace("Bearer ", "");

    if (!accessToken) {
      return res.status(401).json({
        error: "Unauthorized. Provide access token in Authorization header",
      });
    }

    const authClient = getAuthClient(accessToken);
    const meet = google.meet("v2");

    console.log("[GET-PARTICIPANTS] Looking up conference for:", identifier);

    // Get the conference record name
    const conferenceRecordName = await getConferenceRecord(
      meet,
      authClient,
      identifier
    );

    if (!conferenceRecordName) {
      return res.status(404).json({
        error: "Conference record not found for the provided identifier",
        identifier,
      });
    }

    console.log(
      "[GET-PARTICIPANTS] Found conference record:",
      conferenceRecordName
    );

    // List participants from the conference
    const response = await meet.conferenceRecords.participants.list({
      auth: authClient,
      parent: conferenceRecordName,
      pageSize: pageSize ? parseInt(pageSize as string) : 100,
      pageToken: pageToken as string,
    });

    // Format participants
    const participants: Participant[] = (response.data.participants || []).map(
      (p: any) => {
        let type: "signed_in" | "anonymous" | "phone" = "anonymous";
        let name = "Unknown";
        let email: string | undefined;

        if (p.signedinUser) {
          type = "signed_in";
          name = p.signedinUser.displayName || "Unknown User";
          email = p.signedinUser.user; // This is the user resource name, not email
        } else if (p.anonymousUser) {
          type = "anonymous";
          name = p.anonymousUser.displayName || "Anonymous";
        } else if (p.phoneUser) {
          type = "phone";
          name = p.phoneUser.displayName || "Phone User";
        }

        return {
          id: p.name?.split("/").pop() || "",
          name,
          email,
          joinedAt: p.earliestStartTime,
          leftAt: p.latestEndTime,
          status: p.latestEndTime ? "left" : "joined",
          type,
        };
      }
    );

    console.log(
      "[GET-PARTICIPANTS] Found",
      participants.length,
      "participants"
    );

    return res.status(200).json({
      conferenceRecord: conferenceRecordName,
      participants,
      nextPageToken: response.data.nextPageToken,
      totalCount: participants.length,
    });
  } catch (error: any) {
    console.error("[GET-PARTICIPANTS] Error:", error);

    // Provide more helpful error messages
    let errorMessage = error.message || "Internal server error";
    let statusCode = 500;

    if (error.code === 404) {
      errorMessage = "Conference or space not found";
      statusCode = 404;
    } else if (error.code === 403) {
      errorMessage =
        "Permission denied. Check if the Meet API is enabled and you have the required scopes";
      statusCode = 403;
    } else if (error.code === 401) {
      errorMessage = "Invalid or expired access token";
      statusCode = 401;
    }

    return res.status(statusCode).json({
      error: errorMessage,
      details: error.errors || error.message,
    });
  }
}
