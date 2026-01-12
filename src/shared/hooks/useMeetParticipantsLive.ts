import { useEffect, useCallback, useRef } from "react";
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

interface UseMeetParticipantsLiveResult {
  participants: Participant[];
  activeParticipants: Participant[];
  participantNames: string[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const pollingInterval = 5000;
let globalPollingInstance: NodeJS.Timeout | null = null;
let activeInstances = 0;

export function useMeetParticipantsLive(): UseMeetParticipantsLiveResult {
  const { user } = useAuthedUser();
  const { meetingDetails } = useMeetSdk();

  // Read from Zustand store
  const participants = useZustandStore((state) => state.participants);
  const loading = useZustandStore((state) => state.participantsLoading);
  const error = useZustandStore((state) => state.participantsError);
  const setParticipants = useZustandStore((state) => state.setParticipants);
  const setLoading = useZustandStore((state) => state.setParticipantsLoading);
  const setError = useZustandStore((state) => state.setParticipantsError);
  const autoFetch = useZustandStore((state) => state.isShufflerOn);

  const isMountedRef = useRef(true);

  // Fetch participants from the API
  const fetchParticipants = useCallback(async () => {
    if (!user?.accessToken) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    // Use meetingDetails if available
    const identifier = meetingDetails?.meetingCode || meetingDetails?.meetingId;

    if (!identifier) {
      setError("No meeting identifier available");
      setLoading(false);
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
  }, [
    user?.accessToken,
    meetingDetails,
    setParticipants,
    setLoading,
    setError,
  ]);

  // Set up polling - only one global instance
  useEffect(() => {
    isMountedRef.current = true;
    activeInstances++;

    if (!autoFetch) {
      // Clean up global polling if this was the last instance and it's no longer needed
      if (activeInstances === 1 && globalPollingInstance) {
        clearInterval(globalPollingInstance);
        globalPollingInstance = null;
      }
      return () => {
        isMountedRef.current = false;
        activeInstances--;
      };
    }

    // Only create one global polling instance
    if (!globalPollingInstance) {
      // Initial fetch
      fetchParticipants();

      // Set up polling
      globalPollingInstance = setInterval(() => {
        fetchParticipants();
      }, pollingInterval);
    }

    return () => {
      isMountedRef.current = false;
      activeInstances--;

      // Clean up global polling when no more instances need it
      if (activeInstances === 0 && globalPollingInstance) {
        clearInterval(globalPollingInstance);
        globalPollingInstance = null;
      }
    };
  }, [autoFetch, fetchParticipants]);

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
