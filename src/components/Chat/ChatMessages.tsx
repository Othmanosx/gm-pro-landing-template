import { useListVals } from "react-firebase-hooks/database";
import { database } from "@root/src/shared/firebase";
import { ref } from "firebase/database";
import ChatMsg from "./ChatMsg";
import LoadingSkeleton from "./LoadingSkeleton";
import { useUsersStore } from "./useUsers";
import { memo } from "react";
import { useEffect } from "react";
import { useZustandStore } from "@root/src/shared/hooks/useGeneralZustandStore";
import RenderIfVisible from "react-render-if-visible";
import { forwardRef } from "react";
import { useMeetMessages } from "@root/src/shared/hooks/useMeetMessages";
import EmptyChat from "./EmptyChat";
import { useLayoutEffect } from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import useLocation from "./useLocation";
import useAuthedUser from "@root/src/firebase/useAuthedUser";
import { getUserProfilePhoto } from "@root/utils/getUserInfo";

export type Message = {
  key: string;
  text: string;
  image?: string;
  reactions?: { [key: string]: string[] };
  timestamp: number;
  userId?: string;
  replyId?: string;
  fullName?: string;
  isEdited?: boolean;
  editedText?: string;
  isSuperOnly?: boolean;
};

const ChatContainer = styled("div")({
  height: "100%",
  overflowY: "auto",
  padding: "16px",
  flex: 1,
  display: "flex",
  flexDirection: "column-reverse",
});

export const YOU_TRANSLATIONS = [
  "You",
  "أنت",
  "Tu",
  "Du",
  "Sie",
  "Vous",
  "Tu",
  "Você",
  "Tú",
  "Siz",
  "Sen",
];
const TWENTY_TWO_HOURS = 22 * 60 * 60 * 1000;

const ChatMessages = (
  { currentMeetId }: { currentMeetId: string },
  chatContainerRef: React.ForwardedRef<HTMLDivElement>
) => {
  const messagesRef = ref(database, `rooms/${currentMeetId}/messages`);
  const localUserID = useAuthedUser().user?.id;
  const setMessage = useZustandStore((state) => state.setMessage);
  // Get the messages from the database only when users are loaded
  const [messages, loading] = useListVals<Message>(messagesRef, {
    keyField: "key",
  });
  const { data: location, isLoading: isLoadingLocation } = useLocation();
  const reset = useMeetMessages((state) => state.reset);
  const setAllMessages = useMeetMessages((state) => state.setAllMessages);
  const setShowNewMessageButton = useZustandStore(
    (state) => state.setShowNewMessageButton
  );
  const setImage = useZustandStore((state) => state.setImage);
  const setReply = useZustandStore((state) => state.setReply);
  const setEditedMessageId = useZustandStore(
    (state) => state.setEditedMessageId
  );

  const editMessage = (message: Message) => {
    setEditedMessageId(message.key);
    setMessage(message.text ?? "");
    setImage(message.image ? { url: message.image } : null);
    const reply = !!message.replyId
      ? messages?.find((msg) => msg.key === message.replyId)
      : undefined;

    setReply(
      reply
        ? {
            id: message.replyId,
            text: reply?.text,
            image: reply?.image,
            userId: reply?.userId,
            isEdited: reply?.isEdited,
            editedText: reply?.editedText,
            isSuperOnly: reply?.isSuperOnly,
            timestamp: reply?.timestamp,
          }
        : undefined
    );
  };

  const allMessagesRaw = [...(messages ?? [])]
    .sort((a, b) => a.timestamp - b.timestamp)
    .reverse();

  // Filter out messages older than 22 hours
  const now = new Date().getTime();
  const allMessages = allMessagesRaw.filter(
    (message) => now - message.timestamp < TWENTY_TWO_HOURS
  );

  setAllMessages(allMessages);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Only access .current if chatContainerRef is a RefObject
      if (
        chatContainerRef &&
        typeof chatContainerRef !== "function" &&
        chatContainerRef.current
      ) {
        const container = chatContainerRef.current;
        // Check if the user is already at the bottom
        const isAtBottom = container.scrollTop > -250;
        const isMyMessage = allMessages[0]?.userId === localUserID;

        if (isAtBottom || isMyMessage) {
          // scroll to the bottom
          container.scrollTop = container.scrollHeight;
        } else {
          setShowNewMessageButton(true);
          // Hide the new message button after 2 seconds
          const timeoutId = setTimeout(() => {
            setShowNewMessageButton(false);
          }, 3000);

          // Clear the timeout when the component unmounts
          return () => clearTimeout(timeoutId);
        }
      }
    }, 10);
    return () => clearTimeout(timer);
  }, [messages?.length, allMessages.length, chatContainerRef]);

  useLayoutEffect(() => {
    // remove all messages and transcriptions from local database if it has been more than 22 hours since the first message was sent in this meet
    const sortedMessages = allMessages.sort(
      (a, b) => a.timestamp - b.timestamp
    );
    const oldestMessage = sortedMessages[0];

    if (
      oldestMessage &&
      new Date().getTime() - oldestMessage.timestamp >= TWENTY_TWO_HOURS
    ) {
      console.log("removing all messages");
      reset();
    }
  }, [reset]);

  if (loading || isLoadingLocation) return <LoadingSkeleton />;

  return (
    <ChatContainer id="chat-container" ref={chatContainerRef}>
      {allMessages.length === 0 && (
        <EmptyChat setMessage={setMessage} location={location} />
      )}
      {allMessages?.map((message, i) => {
        const reply = !!message.replyId
          ? allMessages.find((msg) => msg.key === message.replyId)
          : undefined;

        return (
          <motion.div
            id={message.key}
            key={message.key}
            layout
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{
              duration: 0.2,
            }}
            style={{
              originX: localUserID === message.userId ? 1 : 0,
            }}
          >
            <RenderIfVisible
              initialVisible
              visibleOffset={1800}
              stayRendered={i < 30 || !!message.image || !!reply?.image}
            >
              <ChatMsg
                id={message.key}
                userId={message.userId || message.key}
                text={message.text}
                profileImage={getUserProfilePhoto(message.userId || "")}
                image={message.image}
                reactions={message.reactions}
                side={localUserID === message.userId ? "right" : "left"}
                sameUserNext={
                  message.userId === allMessages[i - 1]?.userId &&
                  allMessages[i - 1] &&
                  Math.abs(message.timestamp - allMessages[i - 1].timestamp) <
                    60000 // 1 minute in milliseconds
                }
                sameUserLast={
                  message.userId === allMessages[i + 1]?.userId &&
                  allMessages[i + 1] &&
                  Math.abs(message.timestamp - allMessages[i + 1].timestamp) <
                    60000 // 1 minute in milliseconds
                }
                reply={reply}
                replyId={message.replyId}
                anonymousFullName={message.fullName}
                editMessage={() => editMessage(message)}
                isEdited={message.isEdited}
                editedText={message.editedText}
                isSuperOnly={message.isSuperOnly}
                timestamp={message.timestamp}
                currentMeetId={currentMeetId}
              />
            </RenderIfVisible>
          </motion.div>
        );
      })}
    </ChatContainer>
  );
};

export default memo(forwardRef(ChatMessages));
