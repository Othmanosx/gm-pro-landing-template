import { useCallback, useEffect } from "react";
import { sendMessageToSuperChat } from "@root/utils/sendMessage";
import { serverTimestamp } from "firebase/database";
import { useZustandStore } from "@root/src/shared/hooks/useGeneralZustandStore";
import { useId } from "react";
import useAuthedUser from "@root/src/firebase/useAuthedUser";

const globalAutoShufflerRef = {
  current: null as {
    observer: MutationObserver | null;
    isActive: boolean;
    cleanup: () => void;
    controllerId: string;
  } | null,
};

const useShuffler = () => {
  const { user: localUser } = useAuthedUser();
  const localUserID = localUser?.id;
  const isShufflerOn = useZustandStore((state) => state.isShufflerOn);
  const setIsShufflerOn = useZustandStore((state) => state.setIsShufflerOn);

  const shufflerId = useId();

  const getParticipants = useCallback(() => {
    const newParticipants: any[] = [];

    return newParticipants;
  }, []);

  const checkParticipantsTab = useCallback(async () => {
    return getParticipants();
  }, [getParticipants]);

  const shuffleParticipants = async () => {
    try {
      const participants = await checkParticipantsTab();
      const shuffledParticipants = [...participants].sort(
        () => Math.random() - 0.5
      );
      sendMessageToSuperChat({
        text: shuffledParticipants.join("\n"),
        userId: localUserID,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.log(1, "Error while shuffling participants:", error);
      alert(
        "An error occurred while shuffling participants. Please reload the window and try again."
      );
    }
  };

  const pickRandomParticipant = async () => {
    try {
      const participants = await checkParticipantsTab();
      const randomParticipant =
        participants[Math.floor(Math.random() * participants.length)];
      sendMessageToSuperChat({
        text: randomParticipant,
        userId: localUserID,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      alert(
        "An error occurred while picking a random participant. Please reload the window and try again."
      );
    }
  };

  useEffect(() => {
    if (!isShufflerOn) {
      // If this instance was controlling the global shuffler, clean it up
      if (globalAutoShufflerRef.current?.controllerId === shufflerId) {
        globalAutoShufflerRef.current.cleanup();
        globalAutoShufflerRef.current = null;
      }
      return;
    }

    // If there's already an active instance, don't create another one
    if (globalAutoShufflerRef.current?.isActive) {
      return;
    }

    // Clean up any existing instance before creating a new one
    if (globalAutoShufflerRef.current) {
      globalAutoShufflerRef.current.cleanup();
    }

    let participants: string[];
    const observer = new MutationObserver(async () => {
      // If someone joins or leaves, post the participants list without shuffling
      const newParticipants = getParticipants();

      // on new member join
      if (
        participants.length > 0 &&
        newParticipants.length > participants.length
      ) {
        try {
          const newMember = newParticipants.filter(
            (p) => !participants.includes(p)
          )[0];
          participants.push(newMember);
          sendMessageToSuperChat({
            text: participants.join("\n"),
            userId: localUserID,
            timestamp: serverTimestamp(),
          });
        } catch (error) {
          alert(
            "An error occurred while posting the updated participants list. Please reload the window and try again."
          );
        }
      }

      // on member leave, filter out the left member, but do not post the list
      if (
        participants.length > 0 &&
        newParticipants.length < participants.length
      ) {
        const leftMember = participants.filter(
          (p) => !newParticipants.includes(p)
        )[0];
        participants = participants.filter((p) => p !== leftMember);
      }
    });

    const cleanup = () => {
      observer.disconnect();
    };

    globalAutoShufflerRef.current = {
      observer,
      isActive: true,
      cleanup,
      controllerId: shufflerId,
    };

    const initializeAutoShuffler = async () => {
      try {
        const newParticipants = await checkParticipantsTab();
        participants = [...newParticipants].sort(() => Math.random() - 0.5);
        sendMessageToSuperChat({
          text: participants.join("\n"),
          userId: localUserID,
          timestamp: serverTimestamp(),
        });
      } catch (error) {
        setIsShufflerOn(false);
        globalAutoShufflerRef.current = null;
        console.log("Error while initializing auto shuffler:", error);
        alert(
          "An error occurred while shuffling participants. Please reload the window and try again."
        );
      }
    };

    initializeAutoShuffler();

    return cleanup;
  }, [
    isShufflerOn,
    checkParticipantsTab,
    getParticipants,
    localUserID,
    setIsShufflerOn,
  ]);

  useEffect(() => {
    return () => {
      // If this instance was controlling the global shuffler, clean it up on unmount
      if (globalAutoShufflerRef.current?.controllerId === shufflerId) {
        globalAutoShufflerRef.current.cleanup();
        globalAutoShufflerRef.current = null;
      }
    };
  }, []);

  return {
    shuffleParticipants,
    pickRandomParticipant,
    toggleAutoShuffler: () => setIsShufflerOn(!isShufflerOn),
    isShufflerOn,
  };
};

export default useShuffler;
