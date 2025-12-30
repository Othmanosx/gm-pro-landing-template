import { database } from "@root/src/shared/firebase";
import { ref, push } from "firebase/database";

type SuperMessage = {
  text?: string;
  imagePayload?: string;
  reply?: string;
  timestamp: any;
  userId: string;
};

export const sendMessageToSuperChat = (
  superMessage: SuperMessage,
  currentMeetId: string
) => {
  const messagesRef = ref(database, `rooms/${currentMeetId}/messages`);
  push(messagesRef, superMessage);
};
