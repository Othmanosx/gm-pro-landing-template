import React, { useEffect } from "react";
import { useMeetParticipants } from "../shared/hooks/useMeetParticipants";

interface MeetParticipantsListProps {
  conferenceId: string;
  accessToken?: string;
  autoSubscribe?: boolean;
}

export const MeetParticipantsList: React.FC<MeetParticipantsListProps> = ({
  conferenceId,
  accessToken,
  autoSubscribe = false,
}) => {
  const { participants, loading, error, refresh, subscribe, unsubscribe } =
    useMeetParticipants({
      conferenceId,
      accessToken,
      enableRealtime: true,
      pollingInterval: 5000,
    });

  // Auto-subscribe on mount if enabled
  useEffect(() => {
    if (autoSubscribe && accessToken) {
      subscribe().catch(console.error);

      return () => {
        unsubscribe().catch(console.error);
      };
    }
  }, [autoSubscribe, accessToken, subscribe, unsubscribe]);

  if (loading) {
    return <div className="p-4">Loading participants...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-600">
        Error: {error.message}
        <button
          onClick={() => refresh()}
          className="ml-4 px-3 py-1 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  const activeParticipants = participants.filter((p) => p.status === "joined");
  const leftParticipants = participants.filter((p) => p.status === "left");

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          Participants ({activeParticipants.length})
        </h2>
        <button
          onClick={() => refresh()}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Refresh
        </button>
      </div>

      {activeParticipants.length === 0 ? (
        <p className="text-gray-500">No active participants</p>
      ) : (
        <div className="space-y-2">
          <h3 className="font-semibold text-green-600">Active</h3>
          {activeParticipants.map((participant) => (
            <div
              key={participant.id}
              className="p-3 border rounded-lg bg-green-50"
            >
              <div className="font-medium">{participant.name}</div>
              <div className="text-sm text-gray-600">{participant.email}</div>
              <div className="text-xs text-gray-500">
                Joined: {new Date(participant.joinedAt).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      )}

      {leftParticipants.length > 0 && (
        <div className="mt-6 space-y-2">
          <h3 className="font-semibold text-gray-600">Left</h3>
          {leftParticipants.map((participant) => (
            <div
              key={participant.id}
              className="p-3 border rounded-lg bg-gray-50"
            >
              <div className="font-medium">{participant.name}</div>
              <div className="text-sm text-gray-600">{participant.email}</div>
              <div className="text-xs text-gray-500">
                Left:{" "}
                {participant.leftAt
                  ? new Date(participant.leftAt).toLocaleTimeString()
                  : "Unknown"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
