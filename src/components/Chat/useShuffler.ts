import { useCallback, useEffect, useRef } from "react";
import { sendMessageToSuperChat } from "@root/utils/sendMessage";
import { serverTimestamp } from "firebase/database";
import { useZustandStore } from "@root/src/shared/hooks/useGeneralZustandStore";
import useAuthedUser from "@root/src/firebase/useAuthedUser";

const globalAutoShufflerRef = {
  current: null as {
    observer: MutationObserver | null;
    isActive: boolean;
    cleanup: () => void;
    controllerId: string;
  } | null,
};

interface UseShufflerOptions {
  participantNames: string[];
  fetchParticipants?: () => Promise<void>;
}

const useShuffler = (
  currentMeetId: string,
  { participantNames, fetchParticipants }: UseShufflerOptions
) => {
  const { user: localUser } = useAuthedUser();
  const localUserID = localUser?.id;
  const isShufflerOn = useZustandStore((state) => state.isShufflerOn);
  const setIsShufflerOn = useZustandStore((state) => state.setIsShufflerOn);
  const previousParticipantsRef = useRef<string[]>([]);

  const shuffleParticipants = useCallback(async () => {
    try {
      // Fetch participants first if a fetch function is provided
      if (fetchParticipants) {
        await fetchParticipants();
      }

      // Wait a bit for state to update
      await new Promise((resolve) => setTimeout(resolve, 100));

      if (participantNames.length === 0) {
        throw new Error("No participants available");
      }

      const shuffledParticipants = [...participantNames].sort(
        () => Math.random() - 0.5
      );
      if (!localUserID) throw new Error("No local user ID");
      sendMessageToSuperChat(
        {
          text: shuffledParticipants.join("\n"),
          userId: localUserID,
          timestamp: serverTimestamp(),
        },
        currentMeetId
      );
    } catch (error) {
      console.log("Error while shuffling participants:", error);
      alert(
        "An error occurred while shuffling participants. Please reload the window and try again."
      );
    }
  }, [participantNames, localUserID, currentMeetId, fetchParticipants]);

  const pickRandomParticipant = useCallback(async () => {
    try {
      // Fetch participants first if a fetch function is provided
      if (fetchParticipants) {
        await fetchParticipants();
      }

      // Wait a bit for state to update
      await new Promise((resolve) => setTimeout(resolve, 100));

      if (participantNames.length === 0) {
        throw new Error("No participants available");
      }
      const randomParticipant =
        participantNames[Math.floor(Math.random() * participantNames.length)];
      if (!localUserID) throw new Error("No local user ID");
      sendMessageToSuperChat(
        {
          text: randomParticipant,
          userId: localUserID,
          timestamp: serverTimestamp(),
        },
        currentMeetId
      );
    } catch (error) {
      alert(
        "An error occurred while picking a random participant. Please reload the window and try again."
      );
    }
  }, [participantNames, localUserID, currentMeetId, fetchParticipants]);

  // Auto-shuffler effect: monitors participant changes and posts updates
  useEffect(() => {
    if (!isShufflerOn) {
      previousParticipantsRef.current = [];
      return;
    }

    // Initialize with current participants if this is the first run
    if (
      previousParticipantsRef.current.length === 0 &&
      participantNames.length > 0
    ) {
      const shuffled = [...participantNames].sort(() => Math.random() - 0.5);
      previousParticipantsRef.current = shuffled;

      if (localUserID) {
        sendMessageToSuperChat(
          {
            text: shuffled.join("\n"),
            userId: localUserID,
            timestamp: serverTimestamp(),
          },
          currentMeetId
        );
      }
      return;
    }

    // Detect new members (someone joined)
    if (participantNames.length > previousParticipantsRef.current.length) {
      const newMembers = participantNames.filter(
        (p) => !previousParticipantsRef.current.includes(p)
      );

      if (newMembers.length > 0 && localUserID) {
        // Add new members to the list
        previousParticipantsRef.current = [
          ...previousParticipantsRef.current,
          ...newMembers,
        ];

        // Post updated list
        sendMessageToSuperChat(
          {
            text: previousParticipantsRef.current.join("\n"),
            userId: localUserID,
            timestamp: serverTimestamp(),
          },
          currentMeetId
        );
      }
    }
    // Detect members leaving (do not post, just update internal list)
    else if (participantNames.length < previousParticipantsRef.current.length) {
      previousParticipantsRef.current = previousParticipantsRef.current.filter(
        (p) => participantNames.includes(p)
      );
    }
  }, [participantNames, isShufflerOn, localUserID, currentMeetId]);

  return {
    shuffleParticipants,
    pickRandomParticipant,
    toggleAutoShuffler: () => setIsShufflerOn(!isShufflerOn),
    isShufflerOn,
  };
};

export default useShuffler;
