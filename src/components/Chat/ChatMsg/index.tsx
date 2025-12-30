import {
  Avatar,
  Stack,
  Tooltip,
  TooltipProps,
  tooltipClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import OptionsPopup from "../OptionsPopup";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { ClickAwayListener } from "@mui/base";
import { useUsersStore } from "../useUsers";
import {
  Reply,
  useZustandStore,
} from "@root/src/shared/hooks/useGeneralZustandStore";
import InfoIcon from "@mui/icons-material/Info";
import { getUserName, getUserProfilePhoto } from "@root/utils/getUserInfo";
import Reactions from "./Reactions";
import { handleAddReaction } from "./shared";
import Image from "./Image";
import HighlightLinks from "./HighlightLinks";

const ChatMsgContainer = styled(motion.div, {
  shouldForwardProp: (prop) => prop !== "side",
})<{
  side?: SideType;
  sameUserLast: boolean;
  isReply: boolean;
  isInChatInput: boolean;
}>(({ theme, side, sameUserLast, isReply, isInChatInput }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: side === "right" ? "flex-end" : "flex-start",
  paddingTop: isReply ? 0 : !sameUserLast ? theme.spacing(2) : 0,
  marginTop: isReply && 20,
  position: "relative",
  marginLeft: isReply && !isInChatInput ? theme.spacing(4) : 0,
  paddingInline: isReply && !isInChatInput ? theme.spacing(2) : 0,
}));

const ReplyContainer = styled("div")<{
  side?: SideType;
  isMe: boolean;
  isDark: boolean;
}>(
  ({ theme, side, isMe, isDark }) => ({
    maxWidth: 220,
    cursor: "pointer",
    direction: isMe ? "rtl" : "ltr",
    paddingBottom: 2,
    "& > div > div": {
      opacity: 0.6,
    },
    "& > ::before": {
      content: '""',
      display: "inline-block",
      background: isDark ? "#35383b" : theme.palette.grey[100],
      width: 5,
      height: "100%",
      top: 0,
      ...(side === "right" ? { right: 0 } : { left: 0 }),

      borderRadius: 140,
      position: "absolute",
      border: "none",
    },
  }),
  { name: "ReplyContainer" }
);

const MsgBox = styled("div", {
  shouldForwardProp: (prop) => prop !== "side",
})<{ side?: SideType }>(({ theme, side }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: side === "right" ? "flex-end" : "flex-start",
  marginBottom: theme.spacing(0.5),
}));

const MessageText = styled(motion.div, {
  shouldForwardProp: (prop) => prop !== "side",
})<{
  side?: SideType;
  sameUserNext?: boolean;
  sameUserLast?: boolean;
  isDark: boolean;
  extraMarginBottom: boolean;
  isTranscriptions?: boolean;
  isOnlyFewEmojis: boolean;
}>(
  ({
    theme,
    side,
    sameUserNext,
    sameUserLast,
    isDark,
    extraMarginBottom,
    isTranscriptions,
    isOnlyFewEmojis,
  }) => ({
    maxWidth: isTranscriptions ? 2000 : 250,
    margin: 0,
    marginBottom: theme.spacing(extraMarginBottom ? 2 : 0),
    position: "relative",
    padding: theme.spacing(1),
    userSelect: "text",
    whiteSpace: "pre-wrap",
    borderTopRightRadius: theme.spacing(
      sameUserLast && side === "right" ? 0.5 : side === "right" ? 0.5 : 2
    ),
    borderTopLeftRadius: theme.spacing(
      sameUserLast && side === "left" ? 0.5 : side === "left" ? 0.5 : 2
    ),
    borderBottomRightRadius: theme.spacing(
      sameUserNext && side === "right" ? 0.5 : 2
    ),
    borderBottomLeftRadius: theme.spacing(
      sameUserNext && side === "left" ? 0.5 : 2
    ),
    wordBreak: "break-word",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontSize: isOnlyFewEmojis ? "2rem" : theme.typography.fontSize,
    backgroundColor:
      side === "right"
        ? isDark
          ? "hsl(210 79% 35% / 1)"
          : theme.palette.primary.main
        : isDark
        ? "#35383b"
        : theme.palette.grey[100],
    color:
      side === "right" ? theme.palette.common.white : isDark ? "#fff" : "#000",
    "& a": {
      color:
        side === "right"
          ? theme.palette.common.white
          : isDark
          ? "#fff"
          : "#000",
    },
  })
);

const UserName = styled(Typography)<{ side?: SideType; isDark: boolean }>(
  ({ theme, side, isDark }) => ({
    ...(side === "right"
      ? { marginRight: theme.spacing(4) }
      : { marginLeft: theme.spacing(4) }),
    fontSize: 13,
    fontWeight: 600,
    color: isDark ? theme.palette.grey[500] : theme.palette.grey[700],
  })
);

const ReactionsTooltip = styled(
  ({ className, ...props }: TooltipProps & { isDark: boolean }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  )
)(({ theme, isDark }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: !isDark ? "#f5f5f9" : "#202124",
    fontSize: theme.typography.pxToRem(12),
    border: !isDark ? "1px solid #dadde9" : "1px solid #35383b",
    borderRadius: theme.spacing(20),
    padding: 0,
  },
}));

const EmojiTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "transparent",
    border: "none",
    padding: 0,
  },
}));

type SideType = "left" | "right";
type Props = {
  text: string;
  userId: string;
  side: SideType;
  sameUserNext?: boolean;
  sameUserLast?: boolean;
  id: string;
  image?: string;
  reactions?: { [key: string]: string[] };
  isReply?: boolean;
  reply?: Reply;
  replyId?: string;
  anonymousFullName?: string;
  isOldChatMessage?: boolean;
  isInChatInput?: boolean;
  setIsReactionsTooltipOpen?: (isReactionsTooltipOpen: boolean) => void;
  editMessage?: () => void;
  isEdited?: boolean;
  editedText?: string;
  isSuperOnly?: boolean;
  profileImage?: string;
  speaker?: string;
  isTranscriptions?: boolean;
  timestamp?: number;
};

function scrollToMessage(id: string) {
  const message = document
    .getElementById("gm-pro-ext")
    .shadowRoot.getElementById(id);
  if (message) {
    message.scrollIntoView({ behavior: "smooth" });
  }
}

function isOnlyFewEmojis(text: string) {
  if (!text) return false;
  const emojiRegex = /\p{Emoji_Presentation}/gu;
  const emojiMatches = text.match(emojiRegex) || [];
  const strippedText = text.replace(emojiRegex, "");
  return strippedText.trim() === "" && emojiMatches.length < 10;
}

function formatTimestamp(timestamp: number) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

  if (diffInHours < 24) {
    // Show time only for messages from today
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } else {
    // Show date and time for older messages
    return date.toLocaleDateString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
}

const ChatMsg = ({
  text,
  userId,
  side,
  sameUserNext = false,
  sameUserLast = false,
  reactions,
  id,
  image,
  isReply,
  reply,
  replyId,
  anonymousFullName,
  isOldChatMessage,
  isInChatInput,
  editMessage,
  isEdited,
  editedText,
  isSuperOnly,
  profileImage,
  speaker,
  isTranscriptions,
  timestamp,
}: Props) => {
  const localUserID = useUsersStore((state) => state.user.id);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [isReactionsTooltipOpen, setIsReactionsTooltipOpen] = useState(false);
  const users = useUsersStore((state) => state.users);

  const setReply = useZustandStore((state) => state.setReply);

  const onReplyClick = () => {
    setReply({
      text,
      userId,
      side,
      id,
      image,
      isEdited,
      editedText,
      isSuperOnly,
      timestamp,
    });
    document
      ?.getElementById("gm-pro-ext")
      ?.shadowRoot?.getElementById("gm-pro-input-box")
      ?.focus();
  };

  const name = getUserName(userId, false, users, anonymousFullName, speaker);
  const fullName = getUserName(userId, true, users, anonymousFullName, speaker);
  const profileImageUrl = profileImage
    ? profileImage
    : getUserProfilePhoto(userId, users);

  const showUserName =
    (!!reply && localUserID !== userId) ||
    isReply ||
    (side === "left" && !sameUserLast);
  const showAvatar = isReply || (side === "left" && (!sameUserLast || reply));
  const hasReactions = reactions && Object.keys(reactions).length > 0;

  return (
    <ChatMsgContainer
      side={side}
      sameUserLast={sameUserLast}
      isReply={isReply}
      isInChatInput={isInChatInput}
    >
      {reply && (
        <ReplyContainer
          onClick={() => scrollToMessage(replyId)}
          isMe={reply.userId === localUserID}
          side={side}
        >
          <ChatMsg
            id={reply.id}
            userId={reply.userId}
            isReply
            text={reply.text}
            image={reply.image}
            side={localUserID === reply.userId ? "right" : "left"}
            isEdited={reply.isEdited}
            editedText={reply.editedText}
            timestamp={reply.timestamp}
          />
        </ReplyContainer>
      )}
      <ClickAwayListener onClickAway={() => setIsEmojiOpen(false)}>
        <div>
          {showUserName && (
            <UserName title={!isOldChatMessage && fullName} side={side}>
              {localUserID === userId ? "You" : name}
              {timestamp && (
                <span
                  style={{
                    marginLeft: 8,
                    fontSize: 10,
                    fontWeight: 400,
                    color: "#999",
                  }}
                >
                  {formatTimestamp(timestamp)}
                </span>
              )}{" "}
              {isOldChatMessage && (
                <Tooltip
                  arrow
                  PopperProps={{
                    style: { zIndex: 10 },
                    disablePortal: true,
                  }}
                  title={
                    <div>
                      This user is not using the GM Pro extension, you
                      won&apos;t be able to reply or react to this message.{" "}
                      <br />
                      Encourage others to install the extension to enjoy the
                      extra features!
                    </div>
                  }
                >
                  <InfoIcon
                    color="warning"
                    sx={{ width: 13, height: 13, verticalAlign: "middle" }}
                  />
                </Tooltip>
              )}
            </UserName>
          )}
          <Stack direction="row" alignItems="flex-start" gap={0.5}>
            <Avatar
              alt={fullName}
              src={profileImageUrl}
              sx={{
                width: 27,
                height: 27,
                visibility: showAvatar ? "visible" : "hidden",
              }}
            >
              {name[0]}
            </Avatar>
            <EmojiTooltip
              title={
                <EmojiPicker
                  onEmojiClick={(emoji) => {
                    handleAddReaction(emoji.unified, id, localUserID);
                    setIsEmojiOpen(false);
                  }}
                  width="auto"
                  height={325}
                  theme={Theme.DARK}
                  previewConfig={{
                    showPreview: false,
                  }}
                />
              }
              open={isEmojiOpen}
              PopperProps={{
                style: { zIndex: 10 },
                disablePortal: true,
                popperOptions: {
                  modifiers: [
                    { name: "offset", options: { offset: [0, -10] } },
                  ],
                },
              }}
              placement="top"
            >
              <MsgBox side={side}>
                <ReactionsTooltip
                  PopperProps={{
                    style: {
                      zIndex: 9,
                      display: isReactionsTooltipOpen ? "none" : undefined,
                    },
                    disablePortal: true,
                    popperOptions: {
                      modifiers: [
                        { name: "offset", options: { offset: [0, -10] } },
                      ],
                    },
                  }}
                  placement={side === "right" ? "top-start" : "top-end"}
                  title={
                    isReply || isOldChatMessage ? null : (
                      <OptionsPopup
                        onReactionsClick={() => setIsEmojiOpen(true)}
                        copy={() =>
                          navigator.clipboard.writeText(
                            editedText ?? text ?? image
                          )
                        }
                        onReplyClick={onReplyClick}
                        onEditMessage={editMessage}
                        sameUser={localUserID === userId}
                        isTranscriptions={isTranscriptions}
                      />
                    )
                  }
                >
                  <MessageText
                    extraMarginBottom={hasReactions && sameUserNext}
                    sameUserNext={sameUserNext}
                    sameUserLast={sameUserLast}
                    side={side}
                    isOnlyFewEmojis={isOnlyFewEmojis(editedText ?? text)}
                    isTranscriptions={isTranscriptions}
                  >
                    {isSuperOnly && (
                      <div style={{ marginTop: -7 }}>
                        <InfoIcon sx={{ width: 8, height: 8 }} />{" "}
                        <span style={{ fontSize: 10, filter: "opacity(0.6)" }}>
                          Sent to GM Pro users only
                        </span>
                      </div>
                    )}
                    <Image imageUrl={image} />
                    <HighlightLinks>{editedText ?? text}</HighlightLinks>
                    {isEdited && (
                      <Typography
                        variant="caption"
                        sx={{ opacity: 0.5 }}
                        fontWeight={300}
                      >
                        {" "}
                        (edited)
                      </Typography>
                    )}

                    {hasReactions && (
                      <Reactions
                        id={id}
                        reactions={reactions}
                        setIsReactionsTooltipOpen={setIsReactionsTooltipOpen}
                      />
                    )}
                  </MessageText>
                </ReactionsTooltip>
              </MsgBox>
            </EmojiTooltip>
          </Stack>
        </div>
      </ClickAwayListener>
    </ChatMsgContainer>
  );
};

export default ChatMsg;
