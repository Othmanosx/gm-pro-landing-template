import { Chip, Stack, Tooltip } from "@mui/material";
import { Emoji } from "emoji-picker-react";
import { motion, AnimatePresence } from "framer-motion";
import { IconButton } from "@mui/material";
import { useUsersStore } from "../useUsers";
import { getUserName } from "@root/utils/getUserInfo";
import { handleAddReaction } from "./shared";
import { useState } from "react";
import useAuthedUser from "@root/src/firebase/useAuthedUser";

type reaction = { emoji: string; users: string[] };
type reactions = { [key: string]: string[] };

type Props = {
  id: string;
  reactions?: reactions;
  isDark: boolean;
  setIsReactionsTooltipOpen?: (isReactionsTooltipOpen: boolean) => void;
  currentMeetId: string;
};

const Reactions = ({
  reactions,
  id,
  setIsReactionsTooltipOpen,
  currentMeetId,
}: Props) => {
  const localUserID = useAuthedUser().user?.id;
  const users = useUsersStore((state) => state.users);
  const [lastChangedIndex, setLastChangedIndex] = useState<number>();
  const reactionsArray = reactions
    ? Object.entries(reactions).map(([emoji, users]) => ({ emoji, users }))
    : [];

  const handleClickEmoji = (item: reaction, i: number) => {
    setIsReactionsTooltipOpen?.(false);
    if (!localUserID) throw new Error("No local user ID");
    if (!currentMeetId) throw new Error("No current meet ID");
    handleAddReaction(item.emoji, id, localUserID, currentMeetId);
    setLastChangedIndex(i);
  };
  const animatingMessages = reactionsArray.slice(lastChangedIndex);

  return (
    <Stack
      flexWrap="wrap"
      gap={1}
      flexDirection="row"
      sx={{
        position: reactionsArray.length < 1 ? "absolute" : "relative",
        mb: reactionsArray.length > 0 ? -3 : 0,
        zIndex: 1,
      }}
    >
      <AnimatePresence initial={false} mode="popLayout">
        {reactionsArray
          .sort((a, b) => b.users.length - a.users.length)
          .map((item, i) => {
            const myReaction = item.users.includes(localUserID!);
            return (
              <motion.div
                key={id + item.emoji}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  opacity: { duration: 0.2 },
                  layout: {
                    type: "spring",
                    bounce: 0.4,
                    duration: lastChangedIndex
                      ? animatingMessages.indexOf(item) * 0.15 + 0.85
                      : 1,
                  },
                }}
              >
                <Tooltip
                  title={
                    <div>
                      <div style={{ textAlign: "center" }}>
                        <Emoji unified={item.emoji} size={35} />
                      </div>
                      {item.users.map((userId) => (
                        <div key={userId} style={{ whiteSpace: "pre" }}>
                          {getUserName(userId, false, users)}
                        </div>
                      ))}
                    </div>
                  }
                  PopperProps={{
                    style: { zIndex: 8 },
                    disablePortal: true,
                  }}
                  onClose={() => setIsReactionsTooltipOpen?.(false)}
                  onOpen={() => setIsReactionsTooltipOpen?.(true)}
                  disableInteractive
                  arrow
                >
                  <motion.div
                    key={id + item.emoji + item.users.length}
                    animate={{ scale: [1, 1.7, 1.7, 1.7, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Chip
                      size="small"
                      sx={{
                        "& .MuiChip-icon": { ml: "-2px", mr: "-10px" },
                        backgroundColor: myReaction ? "#0079dd" : "#212324b3",
                        color: myReaction ? "#fff" : "#000",
                      }}
                      icon={
                        <IconButton
                          onClick={() => handleClickEmoji(item, i)}
                          size={"small"}
                          title="Add Emoji Reaction"
                        >
                          <Emoji unified={item.emoji} size={20} />
                        </IconButton>
                      }
                      label={item.users.length}
                    />
                  </motion.div>
                </Tooltip>
              </motion.div>
            );
          })}
      </AnimatePresence>
    </Stack>
  );
};

export default Reactions;
