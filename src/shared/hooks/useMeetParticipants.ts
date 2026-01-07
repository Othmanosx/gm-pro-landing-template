import { useState, useEffect, useCallback } from "react";
import { Participant } from "../../types/meet-events";

interface UseMeetParticipantsOptions {
  conferenceId: string;
  accessToken?: string;
  enableRealtime?: boolean; // Use SSE for real-time updates
  pollingInterval?: number; // Fallback polling interval in ms (default: 5000)
}

interface UseMeetParticipantsResult {
  participants: Participant[];
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  subscribe: () => Promise<void>;
  unsubscribe: () => Promise<void>;
}

export function useMeetParticipants({
  conferenceId,
  accessToken,
  enableRealtime = true,
  pollingInterval = 5000,
}: UseMeetParticipantsOptions): UseMeetParticipantsResult {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);

  // Fetch participants from API
  const fetchParticipants = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const headers: HeadersInit = {};
      if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
      }

      const response = await fetch(
        `/api/meet/participants?conferenceId=${conferenceId}&source=cache`,
        { headers }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch participants: ${response.statusText}`);
      }

      const data = await response.json();
      setParticipants(data.participants || []);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [conferenceId, accessToken]);

  // Set up real-time updates via SSE
  useEffect(() => {
    if (!enableRealtime || !conferenceId) {
      console.log("[useMeetParticipants] SSE disabled:", {
        enableRealtime,
        conferenceId,
      });
      return;
    }

    const sseUrl = `/api/meet/participants-sse?conferenceId=${conferenceId}`;
    console.log("[useMeetParticipants] Connecting to SSE:", sseUrl);
    const es = new EventSource(sseUrl);

    es.onopen = () => {
      console.log("[useMeetParticipants] SSE connection opened");
    };

    es.onmessage = (event) => {
      console.log("[useMeetParticipants] SSE message received:", event.data);
      try {
        const data = JSON.parse(event.data);
        console.log("[useMeetParticipants] Parsed SSE data:", data);
        if (data.type === "initial" || data.type === "update") {
          setParticipants(data.participants || []);
          setLoading(false);
          console.log(
            "[useMeetParticipants] Participants updated:",
            data.participants?.length || 0
          );
        }
      } catch (err) {
        console.error(
          "[useMeetParticipants] Failed to parse SSE message:",
          err
        );
      }
    };

    es.onerror = (err) => {
      console.error("[useMeetParticipants] SSE error:", err);
      setError(new Error("Real-time connection error"));
      es.close();
    };

    setEventSource(es);

    return () => {
      console.log("[useMeetParticipants] Closing SSE connection");
      es.close();
    };
  }, [conferenceId, enableRealtime]);

  // Fallback polling when SSE is not enabled
  useEffect(() => {
    if (enableRealtime || !conferenceId) {
      return;
    }

    fetchParticipants();

    const intervalId = setInterval(fetchParticipants, pollingInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [conferenceId, enableRealtime, pollingInterval, fetchParticipants]);

  // Create subscription
  const subscribe = useCallback(async () => {
    if (!accessToken) {
      throw new Error("Access token is required to create subscription");
    }

    try {
      const response = await fetch("/api/meet/subscriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          conferenceId,
          pubsubTopic: process.env.NEXT_PUBLIC_PUBSUB_TOPIC,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to create subscription: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  }, [conferenceId, accessToken]);

  // Delete subscription
  const unsubscribe = useCallback(async () => {
    if (!accessToken) {
      throw new Error("Access token is required to delete subscription");
    }

    try {
      // First, get all subscriptions to find the one for this conference
      const listResponse = await fetch("/api/meet/subscriptions", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!listResponse.ok) {
        throw new Error("Failed to list subscriptions");
      }

      const subscriptions = await listResponse.json();
      const targetResource = `//meet.googleapis.com/conferenceRecords/${conferenceId}`;
      const subscription = subscriptions.find(
        (sub: any) => sub.targetResource === targetResource
      );

      if (!subscription) {
        return; // No subscription found
      }

      const response = await fetch(
        `/api/meet/subscriptions?subscriptionName=${encodeURIComponent(
          subscription.name
        )}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to delete subscription: ${response.statusText}`
        );
      }
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  }, [conferenceId, accessToken]);

  // Clean up SSE connection on unmount
  useEffect(() => {
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [eventSource]);

  return {
    participants,
    loading,
    error,
    refresh: fetchParticipants,
    subscribe,
    unsubscribe,
  };
}
