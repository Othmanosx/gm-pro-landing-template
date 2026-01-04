import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import {
  Avatar,
  AvatarGroup,
  Badge,
  Divider,
  FormControlLabel,
  Menu,
  MenuItem,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState, useMemo } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { signOut } from "firebase/auth";
import { auth } from "@root/src/firebase/init";
import useShuffler from "./useShuffler";
import { useUsersStore } from "./useUsers";
import { Timestamp } from "firebase/firestore";
import ShufflerIcon from "../ShufflerIcon";
import useAuthedUser from "@root/src/firebase/useAuthedUser";

const MAX_LENGTH = 8;

// Handle Firebase Timestamp using Firebase utilities
const getTimestamp = (
  timestamp:
    | Timestamp
    | { seconds: number; nanoseconds?: number }
    | { toMillis(): number }
) => {
  // Check if it's a Firebase Timestamp object
  if (timestamp instanceof Timestamp) {
    return timestamp.toMillis();
  }
  // Check if it has toMillis method (Timestamp-like object)
  if (
    timestamp &&
    "toMillis" in timestamp &&
    typeof timestamp.toMillis === "function"
  ) {
    return timestamp.toMillis();
  }
  // Handle plain object with seconds and nanoseconds (serialized Timestamp)
  if (
    timestamp &&
    "seconds" in timestamp &&
    typeof timestamp.seconds === "number"
  ) {
    // Convert Firebase Timestamp format to milliseconds
    return timestamp.seconds * 1000 + (timestamp.nanoseconds || 0) / 1000000;
  }
  return 0;
};

const Header = ({ currentMeetId }: { currentMeetId: string }) => {
  const { user } = useAuthedUser();
  const email = user?.email ?? "";
  const fullName =
    user?.fullName ?? (user?.email ? user.email.split("@")[0] : "") ?? "";
  const profileImageUrl =
    user?.profileImageUrl ?? (user as any)?.photoURL ?? "";
  const {
    shuffleParticipants,
    pickRandomParticipant,
    toggleAutoShuffler,
    isShufflerOn,
  } = useShuffler(currentMeetId);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [settingsAnchorEl, setSettingsAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const open = Boolean(anchorEl);
  const settingsOpen = Boolean(settingsAnchorEl);
  const activeUsers = useUsersStore((state) => state.activeUsers);

  // Sort users by lastSeen time (most recent last) and filter out users not seen in 4 hours
  const sortedUsers = useMemo(() => {
    if (!activeUsers) return activeUsers;

    const FOUR_HOURS = 4 * 60 * 60 * 1000; // 4 hours in milliseconds
    const now = new Date().getTime();

    // Filter out users whose lastSeen is more than 4 hours old (people using old versions of the extension)
    const recentUsers = activeUsers.filter((user) => {
      if (!user.lastSeen) return true; // Keep users without lastSeen data

      const lastSeenTime = getTimestamp(user.lastSeen);
      return now - lastSeenTime < FOUR_HOURS;
    });

    return [...recentUsers].sort((a, b) => {
      // If one user doesn't have lastSeen, put them at the end
      if (!a.lastSeen) return 1;
      if (!b.lastSeen) return -1;

      const aTime = getTimestamp(a.lastSeen);
      const bTime = getTimestamp(b.lastSeen);

      return aTime - bTime; // Most recent last
    });
  }, [activeUsers]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSettingsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSettingsAnchorEl(event.currentTarget);
  };
  const handleSettingsClose = () => {
    setSettingsAnchorEl(null);
  };

  return (
    <Stack direction="row" spacing={1} m={"4px 8px"} alignItems="center">
      <div>
        <IconButton
          id="settings-button"
          onClick={handleSettingsClick}
          style={{ marginRight: 8 }}
        >
          <SettingsIcon />
        </IconButton>
        <Menu
          id="settings-menu"
          anchorEl={settingsAnchorEl}
          open={settingsOpen}
          onClose={handleSettingsClose}
          disablePortal
          MenuListProps={{
            "aria-labelledby": "settings-button",
          }}
        >
          <MenuItem sx={{ pointerEvents: "none", py: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Avatar src={profileImageUrl} alt={fullName || email} />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="subtitle2"
                  component="div"
                  sx={{ fontWeight: 600 }}
                >
                  {fullName || "Signed in"}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {email || ""}
                </Typography>
              </div>
            </div>
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={async () => {
              try {
                await signOut(auth);
              } catch (e) {
                console.error("Sign out failed:", e);
              }
              handleSettingsClose();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </div>
      <AvatarGroup
        max={MAX_LENGTH}
        spacing={sortedUsers?.length > MAX_LENGTH ? "small" : "medium"}
        style={{ margin: "auto" }}
        slotProps={{
          additionalAvatar: {
            style: {
              overflow: "visible",
            },
          },
        }}
        renderSurplus={(surplus) => (
          <Tooltip
            title={
              <>
                {sortedUsers
                  ?.slice(sortedUsers?.length - surplus, sortedUsers?.length)
                  .map((user) => (
                    <div
                      key={user.id}
                      style={{ whiteSpace: "nowrap", lineHeight: 1.2 }}
                    >
                      {user.fullName ?? user.email?.split("@")?.[0]}
                    </div>
                  ))}
              </>
            }
            PopperProps={{
              style: { zIndex: 8 },
              disablePortal: true,
            }}
            disableInteractive
            enterNextDelay={100}
            arrow
          >
            <div>+{surplus}</div>
          </Tooltip>
        )}
      >
        {sortedUsers?.map((user) => (
          <Tooltip
            key={user.id}
            title={user.fullName ?? user.email?.split("@")?.[0]}
            PopperProps={{
              style: { zIndex: 8 },
              disablePortal: true,
            }}
            disableInteractive
            enterNextDelay={100}
            arrow
          >
            <Avatar
              alt={user.fullName ?? user.email?.split("@")?.[0]}
              src={user.profileImageUrl}
            />
          </Tooltip>
        ))}
      </AvatarGroup>
      <Tooltip
        PopperProps={{
          style: { zIndex: 10 },
          disablePortal: true,
        }}
        title={
          isShufflerOn
            ? "Shuffler is on, new joiners will be added to the list"
            : null
        }
        arrow
        placement="left"
      >
        <IconButton
          id="shuffler-button"
          onClick={handleClick}
          style={{ marginLeft: 0 }}
        >
          <Badge color="secondary" variant="dot" invisible={!isShufflerOn}>
            <ShufflerIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        disablePortal
        onClose={handleClose}
        color="dark"
        MenuListProps={{
          "aria-labelledby": "shuffler-button",
        }}
      >
        <MenuItem
          onClick={() => handleClose()}
          title="Shuffles the current attendees and sends the list as a message automatically every time a new person joins the call"
        >
          <FormControlLabel
            control={<Switch color="primary" size="small" />}
            label="Auto Shuffle Participants"
            sx={{ marginLeft: 0 }}
            labelPlacement="start"
            onChange={toggleAutoShuffler}
            checked={isShufflerOn}
          />
        </MenuItem>
        <MenuItem
          onClick={() => {
            shuffleParticipants();
            handleClose();
          }}
          title="Shuffles the current attendees and sends the list as a message"
        >
          Shuffle Participants Once
        </MenuItem>
        <MenuItem
          onClick={() => {
            pickRandomParticipant();
            handleClose();
          }}
          title="Randomly selects someone from the attendees and posts their name as a message"
        >
          Pick One
        </MenuItem>
      </Menu>
    </Stack>
  );
};

export default Header;
