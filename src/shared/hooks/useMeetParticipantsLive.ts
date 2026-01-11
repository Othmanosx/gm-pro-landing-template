import { useState, useEffect, useCallback, useRef } from "react";
import useAuthedUser from "@root/src/firebase/useAuthedUser";
import useMeetSdk from "./useMeetSdk";
import { useZustandStore } from "./useGeneralZustandStore";

interface Participant {
  id: string;
  name: string;
  email?: string;
  joinedAt?: string;
  leftAt?: string;
  status: "joined" | "left";
  type: "signed_in" | "anonymous" | "phone";
}

interface UseMeetParticipantsLiveOptions {
  autoFetch?: boolean; // When true, continuously fetches every 5 seconds
  pollingInterval?: number; // Polling interval in ms (default: 5000)
}

interface UseMeetParticipantsLiveResult {
  participants: Participant[];
  activeParticipants: Participant[];
  participantNames: string[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const pollingInterval = 5000;

export function useMeetParticipantsLive({}: UseMeetParticipantsLiveOptions = {}): UseMeetParticipantsLiveResult {
  const { user } = useAuthedUser();
  const { meetingDetails } = useMeetSdk();
  const autoFetch = useZustandStore((state) => state.isShufflerOn);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  // Fetch participants from the API
  const fetchParticipants = useCallback(async () => {
    if (!user?.accessToken) {
      setError("User not authenticated");
      return;
    }

    // Use meetingDetails if available
    const identifier = meetingDetails?.meetingCode || meetingDetails?.meetingId;

    if (!identifier) {
      setError("No meeting identifier available");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/meet/get-participants?spaceName=${encodeURIComponent(
          identifier
        )}`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();

      if (isMountedRef.current) {
        setParticipants(data.participants || []);
      }
    } catch (error: any) {
      console.error("Error fetching participants:", error);
      if (isMountedRef.current) {
        setError(error.message || "Failed to fetch participants");
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [user?.accessToken, meetingDetails]);

  // Set up polling when autoFetch is enabled
  useEffect(() => {
    isMountedRef.current = true;

    if (!autoFetch) {
      // Clear any existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Initial fetch
    fetchParticipants();

    // Set up polling
    intervalRef.current = setInterval(() => {
      fetchParticipants();
    }, pollingInterval);

    return () => {
      isMountedRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [autoFetch, pollingInterval, fetchParticipants]);

  // Compute active participants (those who haven't left)
  const activeParticipants = participants.filter((p) => p.status === "joined");

  // Get participant names for shuffler compatibility
  const participantNames = activeParticipants.map((p) => p.name);

  return {
    participants,
    activeParticipants,
    participantNames,
    loading,
    error,
    refresh: fetchParticipants,
  };
}
