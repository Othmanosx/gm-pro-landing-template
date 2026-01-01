import { useRef, memo } from "react";
import { ref, serverTimestamp, update } from "firebase/database";
import ChatInput from "./ChatInput";
import { Stack } from "@mui/material";
import { useUsersStore } from "./useUsers";
import ChatMessages from "./ChatMessages";
import LoadingSkeleton from "./LoadingSkeleton";
import { useZustandStore } from "@root/src/shared/hooks/useGeneralZustandStore";
import { sendMessageToSuperChat } from "@root/utils/sendMessage";
import { database } from "@root/src/shared/firebase";
import useAuthedUser from "@root/src/firebase/useAuthedUser";

const Elmo = "https://ia804501.us.archive.org/19/items/elmo_20231221/elmo.jpg";

const ChatRoom = ({ currentMeetId }: { currentMeetId: string }) => {
  const localUserID = useAuthedUser().user?.id;
  const chatContainerRef = useRef<HTMLDivElement>(null);
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

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!currentMeetId) throw new Error("No current meet ID");
    if (!localUserID) throw new Error("No local user ID");
    e.preventDefault();

    const isElmo = message.toLocaleLowerCase() === "/elmo";
    try {
      if (image?.url || message !== "") {
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
          sendMessageToSuperChat(
            {
              ...(text && { text }),
              ...(imagePayload && { image: imagePayload }),
              ...(reply && { replyId: reply?.id }),
              ...(reply?.isSuperOnly && { isSuperOnly: true }),
              timestamp: serverTimestamp(),
              userId: localUserID,
            },
            currentMeetId
          );
        }
        setMessage("");
        setImage(null);
        setReply(undefined);
        setEditedMessageId("");
        (
          chatContainerRef?.current?.firstChild as HTMLElement | null
        )?.scrollIntoView({
          block: "start",
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Stack
      justifyContent="space-between"
      sx={{ height: "calc(100% - 97px)", flexGrow: 1 }}
    >
      {users?.length === 0 ? (
        <LoadingSkeleton />
      ) : (
        <ChatMessages ref={chatContainerRef} currentMeetId={currentMeetId} />
      )}
      <ChatInput
        ref={chatContainerRef}
        sendMessage={sendMessage}
        currentMeetId={currentMeetId}
      />
    </Stack>
  );
};

export default memo(ChatRoom);
