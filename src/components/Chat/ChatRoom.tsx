import { useRef, memo } from "react";
import { ref, serverTimestamp, update } from "firebase/database";
import ChatInput from "./ChatInput";
import { Alert, AlertTitle, Stack } from "@mui/material";
import { useUsersStore } from "./useUsers";
import ChatMessages from "./ChatMessages";
import LoadingSkeleton from "./LoadingSkeleton";
import { useZustandStore } from "@root/src/shared/hooks/useGeneralZustandStore";
import {
  getOldChatElements,
  sendMessageToSuperChat,
} from "@root/utils/sendMessage";
import { Elmo, getOldMessage } from "@root/utils/getOldMessage";
import { database } from "@root/src/shared/firebase";

const ChatRoom = ({ currentMeetId }: { currentMeetId: string }) => {
  const chatContainerRef = useRef(null);
  const localUserID = useUsersStore((state) => state.user.id);
  const users = useUsersStore((state) => state.users);
  const image = useZustandStore((state) => state.image);
  const setImage = useZustandStore((state) => state.setImage);
  const message = useZustandStore((state) => state.message)?.trim();
  const setMessage = useZustandStore((state) => state.setMessage);
  const reply = useZustandStore((state) => state.reply);
  const setReply = useZustandStore((state) => state.setReply);
  const setEditedMessageId = useZustandStore(
    (state) => state.setEditedMessageId
  );
  const editedMessageId = useZustandStore((state) => state.editedMessageId);

  const sendMessage = async (e) => {
    if (!currentMeetId) return;
    e.preventDefault();

    const isElmo = message.toLocaleLowerCase() === "/elmo";
    try {
      if (image?.url || message !== "") {
        const oldChatMessage = getOldMessage({
          message: message,
          imageUrl: image?.url,
          reply,
          isElmo,
        });
        const text = isElmo ? "" : message;
        const imagePayload = isElmo ? Elmo : image?.url ? image?.url : "";
        if (editedMessageId) {
          const messageRef = ref(
            database,
            `rooms/${currentMeetId}/messages/${editedMessageId}`
          );
          update(messageRef, {
            image: imagePayload ?? "",
            replyId: reply?.id ?? "",
            editTimestamp: serverTimestamp(),
            userId: localUserID,
            isEdited: true,
            editedText: text,
          });
        } else {
          sendMessageToSuperChat({
            ...(text && { text }),
            ...(imagePayload && { image: imagePayload }),
            ...(reply && { replyId: reply?.id }),
            ...(reply?.isSuperOnly && { isSuperOnly: true }),
            timestamp: serverTimestamp(),
            userId: localUserID,
          });
        }
        setMessage("");
        setImage(null);
        setReply(undefined);
        setEditedMessageId(undefined);
        chatContainerRef?.current?.firstChild?.scrollIntoView({
          block: "start",
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const noUserDetails = !localUserID;

  return (
    <Stack
      justifyContent="space-between"
      sx={{ height: "calc(100% - 97px)", flexGrow: 1 }}
    >
      {noUserDetails && (
        <Alert severity="error" variant="filled" sx={{ m: 2 }}>
          <AlertTitle>Oops! You&apos;re not logged in.</AlertTitle>
          To enjoy the chat feature, please follow these steps:
          <ol>
            <li>Sign in with your Google account in Chrome.</li>
            <li>
              Ensure that &apos;Sync&apos; is enabled. You can check this in
              your Chrome settings (chrome://settings/syncSetup).
            </li>
          </ol>
        </Alert>
      )}
      {users?.length === 0 ? (
        <LoadingSkeleton />
      ) : (
        <ChatMessages ref={chatContainerRef} currentMeetId={currentMeetId} />
      )}
      <ChatInput
        ref={chatContainerRef}
        disabled={noUserDetails}
        sendMessage={sendMessage}
      />
    </Stack>
  );
};

export default memo(ChatRoom);
