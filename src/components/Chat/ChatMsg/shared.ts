import { ref, runTransaction } from "firebase/database";
import { database } from "@root/src/shared/firebase";

export const handleAddReaction = (
  emoji: string,
  messageKey: string,
  localUserId: string,
  currentMeetId: string
) => {
  const messageRef = ref(
    database,
    `rooms/${currentMeetId}/messages/${messageKey}/reactions/${emoji}`
  );
  runTransaction(messageRef, (reactions) => {
    if (!reactions) {
      return [localUserId];
    }
    if (reactions.includes(localUserId)) {
      return reactions.filter((userId) => userId !== localUserId);
    }
    return [...reactions, localUserId];
  });
};
