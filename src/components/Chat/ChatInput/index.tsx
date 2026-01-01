import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import SmileyFaceIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SendIcon from "@mui/icons-material/Send";
import {
  Alert,
  Chip,
  CircularProgress,
  ClickAwayListener,
  TextField,
  Tooltip,
  TooltipProps,
  tooltipClasses,
  Autocomplete,
  Avatar,
  ListSubheader,
} from "@mui/material";
import GifPicker, { Theme } from "gif-picker-react";
import GifIcon from "@mui/icons-material/Gif";
import ImageIcon from "@mui/icons-material/Image";
import { useState } from "react";
import { Stack, styled } from "@mui/system";
import CancelIcon from "@mui/icons-material/Cancel";
import { AnimatePresence, motion } from "framer-motion";
import { useZustandStore } from "@root/src/shared/hooks/useGeneralZustandStore";
import { forwardRef } from "react";
import ChatMsg from "../ChatMsg";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import EmojiPicker from "emoji-picker-react";
import { useRef } from "react";
import { useTextTransform } from "../useTextTransform";
import InputHeader from "./InputHeader";
import CircularWithValueLabel from "./CircularProgressWithLabel";
import { useImageUpload } from "./useImageUpload";
import { useUsersStore } from "../useUsers";
import { AlternateEmail } from "@mui/icons-material";
import useShuffler from "../useShuffler";
import { Shuffle, Person, PlayArrow, Stop, Bolt } from "@mui/icons-material";
import ElmoIcon from "./ElmoIcon";

const TransparentTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "transparent",
    border: "none",
    padding: 0,
  },
}));

const DragZonePlaceholder = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      zIndex: 1,
      margin: "0 1rem 1rem",
      backgroundColor: "rgb(51 51 51 / 70%)",
      borderRadius: 10,
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    }}
  >
    <ImageIcon sx={{ fontSize: 48, color: "#fff", mb: 1 }} />
    <p
      style={{
        margin: 0,
        color: "#fff",
        fontSize: "16px",
        fontWeight: "bold",
      }}
    >
      Drop image to upload
    </p>
    <p
      style={{
        margin: "4px 0 0 0",
        color: "#ccc",
        fontSize: "12px",
      }}
    >
      or paste from clipboard
    </p>
  </div>
);

const variants = {
  hidden: { opacity: 0, height: 0, scale: 0.8, transition: { duration: 0.2 } },
  visible: {
    opacity: 1,
    height: "auto",
    scale: 1,
    transition: { duration: 0.2 },
  },
  exit: { opacity: 0, height: 0, scale: 0.8, transition: { duration: 0.2 } },
};

interface Props {
  isLoading?: boolean;
  sendMessage: (e: any) => void;
  disabled?: boolean;
  currentMeetId: string;
}
function ChatInput(
  { isLoading, sendMessage, disabled, currentMeetId }: Props,
  chatContainerRef: React.ForwardedRef<HTMLDivElement>
) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [openGifPicker, setOpenGifPicker] = useState(false);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [showUserSuggestions, setShowUserSuggestions] = useState(false);
  const [showCommandSuggestions, setShowCommandSuggestions] = useState(false);
  const [userQuery, setUserQuery] = useState("");
  const [commandQuery, setCommandQuery] = useState("");
  const [atSymbolPosition, setAtSymbolPosition] = useState(-1);
  const [slashSymbolPosition, setSlashSymbolPosition] = useState(-1);
  const image = useZustandStore((state) => state.image);
  const setImage = useZustandStore((state) => state.setImage);
  const value = useZustandStore((state) => state.message);
  const showNewMessageButton = useZustandStore(
    (state) => state.showNewMessageButton
  );
  const reply = useZustandStore((state) => state.reply);
  const editedMessageId = useZustandStore((state) => state.editedMessageId);
  const setEditedMessageId = useZustandStore(
    (state) => state.setEditedMessageId
  );
  const setReply = useZustandStore((state) => state.setReply);
  const setMessage = useZustandStore((state) => state.setMessage);
  const message = useZustandStore((state) => state.message);
  const label = reply ? "Send your reply" : "Send a message";
  const { handleTextTransform, applyBoldToText } = useTextTransform(
    inputRef as React.RefObject<HTMLTextAreaElement>
  );
  // TODO: extract this from firebase directly
  const { isImageUploadingEnabled } = { isImageUploadingEnabled: true };
  const users = useUsersStore((state) => state.users);
  const {
    shuffleParticipants,
    pickRandomParticipant,
    toggleAutoShuffler,
    isShufflerOn,
  } = useShuffler(currentMeetId);
  const participants = users.map((user) => ({
    ...user,
    firstName: user.fullName?.split(" ")[0],
  }));

  // Define available slash commands
  const availableCommands = [
    {
      command: "/elmo",
      description: "Send a photo of Elmo",
      title:
        'ELMO is short for "enough, let\'s move on" - a polite way to request ending an unfruitful conversation',
      icon: <ElmoIcon sx={{ fontSize: 16, mr: 1 }} />,
      action: () => {
        setMessage("/elmo");
      },
    },
    {
      command: "/shuffle",
      description: "Shuffle all participants",
      title: "Shuffles the current attendees and sends the list as a message",
      icon: <Shuffle sx={{ fontSize: 16, mr: 1 }} />,
      action: async () => {
        await shuffleParticipants();
        setMessage("");
      },
    },
    {
      command: "/pick",
      description: "Pick a random participant",
      title:
        "Randomly selects someone from the attendees and posts their name as a message",
      icon: <Person sx={{ fontSize: 16, mr: 1 }} />,
      action: async () => {
        await pickRandomParticipant();
        setMessage("");
      },
    },
    {
      command: "/autoshuffler",
      description: `${isShufflerOn ? "Stop" : "Start"} auto-shuffler`,
      title:
        "Same as /shuffle but runs automatically every time a new person joins the call",
      icon: isShufflerOn ? (
        <Stop sx={{ fontSize: 16, mr: 1 }} />
      ) : (
        <PlayArrow sx={{ fontSize: 16, mr: 1 }} />
      ),
      action: () => {
        toggleAutoShuffler();
        setMessage("");
      },
    },
  ];

  const {
    localImage,
    fileError,
    uploadProgress,
    isUploading,
    resolveImageUpload,
    clearFileError,
    getRootProps,
    getInputProps,
    isDragActive,
    open,
  } = useImageUpload(disabled, inputRef);

  const isButtonDisabled =
    !(image?.url || value || !isLoading) || disabled || isUploading;

  const clearEdit = () => {
    setEditedMessageId("");
    setReply();
    setMessage("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // stop Autocomplete from capturing keys like up and down arrow keys
    !showUserSuggestions && !showCommandSuggestions && e.stopPropagation();
    if (
      e.key === "Enter" &&
      !e.shiftKey &&
      !showUserSuggestions &&
      !showCommandSuggestions
    ) {
      sendMessage(e);
    }
  };

  // Handle username autocompletion
  const handleUsernameSelection = (username: string) => {
    const beforeAt = value.substring(0, atSymbolPosition);
    const afterQuery = value.substring(atSymbolPosition + 1 + userQuery.length);
    const boldedUsername = applyBoldToText(username);
    const mentionText = `@${boldedUsername} `;
    const newValue = beforeAt + mentionText + afterQuery;
    setMessage(newValue);
    setShowUserSuggestions(false);
    setUserQuery("");
    setAtSymbolPosition(-1);

    // Focus back to input
    setTimeout(() => {
      if (inputRef.current) {
        const newCursorPos = beforeAt.length + mentionText.length;
        inputRef.current.focus();
        inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 0);
  };

  // Handle command selection
  const handleCommandSelection = (command: (typeof availableCommands)[0]) => {
    command.action();
    setShowCommandSuggestions(false);
    setCommandQuery("");
    setSlashSymbolPosition(-1);

    // Focus back to input
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const handleInputChange = (newValue: string) => {
    const cursorPos = inputRef.current?.selectionStart || 0;

    // Check for @ mentions and / commands
    const beforeCursor = newValue.substring(0, cursorPos);
    const atIndex = beforeCursor.lastIndexOf("@");
    const slashIndex = beforeCursor.lastIndexOf("/");

    if (
      atIndex !== -1 &&
      cursorPos > atIndex &&
      (slashIndex === -1 || atIndex > slashIndex)
    ) {
      const query = beforeCursor.substring(atIndex + 1);
      if (!query.includes(" ") && query.length >= 0) {
        setUserQuery(query);
        setAtSymbolPosition(atIndex);
        setShowUserSuggestions(true);
        setShowCommandSuggestions(false);
      } else {
        setShowUserSuggestions(false);
        setUserQuery("");
        setAtSymbolPosition(-1);
      }
    } else if (
      slashIndex !== -1 &&
      cursorPos > slashIndex &&
      (atIndex === -1 || slashIndex > atIndex)
    ) {
      const query = beforeCursor.substring(slashIndex + 1);
      // Only show command suggestions if the message starts with "/" and has no spaces before the slash
      const beforeSlash = newValue.substring(0, slashIndex).trim();
      if (!query.includes(" ") && query.length >= 0 && beforeSlash === "") {
        setCommandQuery(query);
        setSlashSymbolPosition(slashIndex);
        setShowCommandSuggestions(true);
        setShowUserSuggestions(false);
      } else {
        setShowCommandSuggestions(false);
        setCommandQuery("");
        setSlashSymbolPosition(-1);
      }
    } else {
      setShowUserSuggestions(false);
      setUserQuery("");
      setAtSymbolPosition(-1);
      setShowCommandSuggestions(false);
      setCommandQuery("");
      setSlashSymbolPosition(-1);
    }

    handleTextTransform(newValue);
    setMessage(newValue);
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        setOpenGifPicker(false);
        setOpenEmojiPicker(false);
        setShowUserSuggestions(false);
        setShowCommandSuggestions(false);
      }}
    >
      <div style={{ flexShrink: 0, position: "relative" }} {...getRootProps()}>
        <input {...getInputProps()} />
        <AnimatePresence>
          {showNewMessageButton && (
            <motion.div
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Chip
                onClick={() => {
                  (() => {
                    if (
                      chatContainerRef &&
                      typeof chatContainerRef !== "function" &&
                      chatContainerRef.current
                    ) {
                      (
                        chatContainerRef.current
                          .firstChild as HTMLElement | null
                      )?.scrollIntoView({
                        block: "start",
                      });
                    }
                  })();
                }}
                label="New Message!"
                color="success"
                sx={{
                  maxWidth: "fit-content",
                  m: "1rem auto",
                  position: "absolute",
                  top: -60,
                  left: 127,
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <Paper
          style={{
            borderRadius: 10,
            margin: "0 1rem 1rem",
            backgroundColor: "#202124",
            ...(isDragActive && {
              outline: "3px dashed",
              borderColor: "#fff",
            }),
          }}
          variant="outlined"
        >
          {isDragActive && <DragZonePlaceholder />}
          <AnimatePresence>
            {fileError && (
              <motion.div
                layout
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Alert
                  severity="error"
                  onClose={clearFileError}
                  style={{
                    margin: "8px",
                    borderRadius: "8px",
                  }}
                >
                  {fileError}
                </Alert>
              </motion.div>
            )}

            {(editedMessageId || reply?.isSuperOnly) && (
              <motion.div
                layout
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Alert
                  severity="info"
                  style={{
                    margin: "8px",
                    borderRadius: "8px",
                  }}
                >
                  {editedMessageId
                    ? "Only GM Pro users can see edited messages."
                    : "Only GM Pro users will see this message."}
                </Alert>
              </motion.div>
            )}

            {reply && reply.id && reply.side && reply.userId && (
              <motion.div
                layout
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{
                  position: "relative",
                  marginTop: reply.side === "right" ? -10 : -18,
                  marginInline: reply.side === "right" ? 16 : 10,
                }}
              >
                <IconButton
                  onClick={() => setReply(undefined)}
                  sx={{
                    position: "absolute",
                    top: reply.side === "right" ? -15 : 0,
                    right: reply.side === "right" ? -18 : -6,
                    zIndex: 1,
                    filter: "drop-shadow(0px 0px 0.5px rgb(0 0 0 / 1))",
                  }}
                >
                  <CancelIcon
                    sx={{
                      color:
                        reply.side === "right" ? "#fff" : "rgb(119 119 119)",
                    }}
                  />
                </IconButton>
                <ChatMsg
                  id={reply.id}
                  userId={reply.userId}
                  text={reply.text}
                  image={reply.image}
                  side={reply.side}
                  isReply
                  isInChatInput
                  isEdited={reply.isEdited}
                  editedText={reply.editedText}
                  timestamp={reply.timestamp}
                  currentMeetId={currentMeetId}
                />
              </motion.div>
            )}

            {(localImage || image) && (
              <motion.div
                layout
                variants={{
                  ...variants,
                  hidden: {
                    ...variants.hidden,
                    height: "auto",
                  },
                }}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ position: "relative" }}
              >
                <IconButton
                  onClick={resolveImageUpload}
                  sx={{
                    position: "absolute",
                    top: 5,
                    left: 5,
                    filter: "drop-shadow(0px 0px 2px rgba(0,0,0,0.5))",
                    zIndex: 1,
                  }}
                >
                  <CancelIcon sx={{ color: "#fff" }} />
                </IconButton>
                <AnimatePresence>
                  {isUploading && (
                    <motion.div
                      variants={variants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      style={{
                        position: "absolute",
                        alignSelf: "anchor-center",
                        justifySelf: "anchor-center",
                        zIndex: 1,
                      }}
                    >
                      <CircularWithValueLabel value={uploadProgress} />
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.img
                  src={localImage || image?.url}
                  animate={{
                    opacity: isUploading ? 0.5 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                  style={{
                    width: "calc(100% - 16px)",
                    margin: 8,
                    borderRadius: 8,
                    maxHeight: "200px",
                    objectFit: "contain",
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <InputHeader inputRef={inputRef} />
          <Autocomplete
            freeSolo
            disableClearable
            disablePortal
            handleHomeEndKeys
            autoHighlight
            autoSelect
            selectOnFocus={false}
            clearOnBlur={false}
            clearOnEscape={false}
            open={showUserSuggestions || showCommandSuggestions}
            inputValue={value}
            options={
              (showUserSuggestions
                ? participants
                : showCommandSuggestions
                ? availableCommands
                : []) as any
            }
            getOptionLabel={(option: any) => {
              if (showUserSuggestions && option.firstName) {
                return option.firstName;
              }
              if (showCommandSuggestions && option.command) {
                return option.command;
              }
              return "";
            }}
            filterOptions={(options: any) => {
              if (showUserSuggestions) {
                const query = userQuery.toLowerCase();
                return options.filter((option: any) =>
                  option.firstName.toLowerCase().includes(query)
                );
              }
              if (showCommandSuggestions) {
                const query = commandQuery.toLowerCase();
                return options.filter((option: any) =>
                  option.command.toLowerCase().includes(query)
                );
              }
              return [];
            }}
            onClose={() => {
              setShowUserSuggestions(false);
              setUserQuery("");
              setShowCommandSuggestions(false);
              setCommandQuery("");
            }}
            onInputChange={(event, newInputValue, reason) => {
              if (reason === "input") {
                handleInputChange(newInputValue);
              }
            }}
            onChange={(event, newValue: any, reason) => {
              if (reason === "selectOption") {
                if (showUserSuggestions && newValue?.firstName) {
                  handleUsernameSelection(newValue.firstName);
                } else if (showCommandSuggestions && newValue?.command) {
                  handleCommandSelection(newValue);
                }
              }
            }}
            renderOption={(props, option: any, { index }) => (
              <>
                {index === 0 && (
                  <ListSubheader
                    sx={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#aaa",
                      backgroundColor: "transparent",
                      position: "unset",
                      lineHeight: 1.2,
                      py: 1,
                    }}
                  >
                    {showUserSuggestions
                      ? "Mention a GM Pro user"
                      : "Available shortcuts"}
                  </ListSubheader>
                )}
                {showUserSuggestions ? (
                  <li {...props} key={option.firstName}>
                    <Avatar
                      alt={option.firstName}
                      src={option.profileImageUrl}
                      sx={{ width: 24, height: 24, mr: 1 }}
                    />
                    {option.firstName}
                  </li>
                ) : (
                  <li {...props} key={option.command} title={option.title}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {option.icon}
                      <div>
                        <strong>{option.command}</strong>
                        <span
                          style={{
                            marginLeft: "8px",
                            color: "#aaa",
                            fontSize: "12px",
                          }}
                        >
                          {option.description}
                        </span>
                      </div>
                    </div>
                  </li>
                )}
              </>
            )}
            sx={{
              "& .MuiAutocomplete-listbox": {
                backgroundColor: "#202124",
                border: `1px solid ${"#444"}`,
                borderRadius: "8px",
                maxHeight: "150px",
              },
              "& .MuiAutocomplete-option": {
                color: "#fff",
                '&[aria-selected="true"]': {
                  backgroundColor: "#333",
                },
                "&:hover": {
                  backgroundColor: "#333",
                },
              },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                id="gm-pro-input-box"
                inputRef={inputRef}
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "6px 8px",
                    "& fieldset": {
                      border: "none",
                    },
                    "&:hover fieldset": {
                      border: "none",
                    },
                    "&.Mui-focused fieldset": {
                      border: "none",
                    },
                  },
                }}
                placeholder={label}
                inputProps={{
                  ...params.inputProps,
                  "aria-label": label,
                  maxLength: 500,
                  style: { maxHeight: 300, overflow: "auto" },
                }}
                value={value}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={onKeyDown}
                fullWidth
                multiline
                disabled={disabled}
                variant="outlined"
              />
            )}
          />
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <TransparentTooltip
              open={openEmojiPicker}
              PopperProps={{
                style: { zIndex: 9 },
                disablePortal: true,
              }}
              title={
                <EmojiPicker
                  onEmojiClick={(emoji) => {
                    setMessage(message + emoji.emoji);
                    setOpenEmojiPicker(false);
                  }}
                  width="auto"
                  height={325}
                  theme={Theme.DARK}
                  previewConfig={{
                    showPreview: false,
                  }}
                />
              }
            >
              <IconButton
                sx={{ p: "6px" }}
                disabled={disabled}
                title="Insert Emoji"
                onClick={() => {
                  setOpenGifPicker(false);
                  setOpenEmojiPicker((prev) => !prev);
                }}
              >
                <SmileyFaceIcon
                  fontSize="small"
                  sx={{
                    color: disabled ? "rgba(0, 0, 0, 0.26)" : "#fff",
                  }}
                />
              </IconButton>
            </TransparentTooltip>
            {isImageUploadingEnabled && (
              <IconButton
                title="Upload Image (or paste from clipboard)"
                sx={{ p: "6px" }}
                disabled={disabled || isUploading}
                onClick={open}
              >
                <ImageIcon
                  fontSize="small"
                  sx={{
                    color: disabled ? "rgba(0, 0, 0, 0.26)" : "#fff",
                  }}
                />
              </IconButton>
            )}
            <TransparentTooltip
              open={openGifPicker}
              PopperProps={{
                style: { zIndex: 9 },
                disablePortal: true,
              }}
              title={
                <div
                  style={{
                    transform: "scale(0.90)",
                    transformOrigin: "bottom",
                  }}
                >
                  <GifPicker
                    onGifClick={(gif) => {
                      resolveImageUpload();
                      setImage(gif);
                      setOpenGifPicker(false);
                    }}
                    theme={Theme.DARK}
                    tenorApiKey={process.env.NEXT_PUBLIC_TENOR_API_KEY!}
                  />
                </div>
              }
            >
              <IconButton
                title="Search GIF"
                sx={{ p: "6px" }}
                disabled={disabled}
                onClick={() => {
                  setOpenEmojiPicker(false);
                  setOpenGifPicker((prev) => !prev);
                }}
              >
                <GifIcon
                  fontSize="small"
                  sx={{
                    color: disabled ? "rgba(0, 0, 0, 0.26)" : "#fff",
                    border: "1.5px dotted currentColor",
                    borderRadius: "50px",
                  }}
                />
              </IconButton>
            </TransparentTooltip>
            <IconButton
              title="Mention Users"
              sx={{ p: "6px" }}
              disabled={disabled}
              onClick={() => {
                const newMessage = message + "@";
                setMessage(newMessage);
                setShowUserSuggestions(true);
                setAtSymbolPosition(message.length);
                setUserQuery("");
                setTimeout(() => {
                  if (inputRef.current) {
                    inputRef.current.focus();
                    inputRef.current.setSelectionRange(
                      newMessage.length,
                      newMessage.length
                    );
                  }
                }, 0);
              }}
            >
              <AlternateEmail
                fontSize="small"
                sx={{
                  color: disabled ? "rgba(0, 0, 0, 0.26)" : "#fff",
                }}
              />
            </IconButton>
            <IconButton
              title="Shortcuts"
              sx={{ p: "6px", mr: "auto" }}
              disabled={disabled || message.trim() !== ""}
              onClick={() => {
                const newMessage = message + "/";
                setMessage(newMessage);
                setShowCommandSuggestions(true);
                setSlashSymbolPosition(message.length);
                setCommandQuery("");
                setTimeout(() => {
                  if (inputRef.current) {
                    inputRef.current.focus();
                    inputRef.current.setSelectionRange(
                      newMessage.length,
                      newMessage.length
                    );
                  }
                }, 0);
              }}
            >
              <Bolt
                fontSize="small"
                sx={{
                  color: "#fff",
                  opacity: disabled || message.trim() !== "" ? 0.5 : 1,
                }}
              />
            </IconButton>

            {editedMessageId && (
              <IconButton
                onClick={clearEdit}
                type="button"
                sx={{ p: "10px", mr: "-10px" }}
                aria-label="search"
              >
                <ClearIcon color={isButtonDisabled ? "disabled" : "primary"} />
              </IconButton>
            )}
            <IconButton
              disabled={isButtonDisabled}
              onClick={(e) => {
                sendMessage(e);
                resolveImageUpload();
              }}
              type="button"
              sx={{ p: "6px" }}
              aria-label="search"
            >
              {isLoading ? (
                <CircularProgress size={24} />
              ) : editedMessageId ? (
                <CheckIcon color={isButtonDisabled ? "disabled" : "primary"} />
              ) : (
                <SendIcon
                  fontSize="small"
                  color={isButtonDisabled ? "disabled" : "primary"}
                />
              )}
            </IconButton>
          </Stack>
        </Paper>
      </div>
    </ClickAwayListener>
  );
}

export default forwardRef(ChatInput);
