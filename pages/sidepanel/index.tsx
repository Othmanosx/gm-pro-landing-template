import { useEffect, useState, useCallback, useRef } from "react";
import {
  meet,
  MeetingInfo,
  MeetSidePanelClient,
} from "@googleworkspace/meet-addons/meet.addons";

import SettingsPanel from "../../src/components/SettingsPanel";
import ChatApp from "../../src/components/Chat/app";
import useAuthedUser from "@root/src/firebase/useAuthedUser";
import GMProLayout from "@root/src/components/GMProLayout";
import Loading from "@root/src/components/Loading";
import GoogleButton from "@root/src/components/GoogleButton";
import { useMeetMessages } from "@root/src/shared/hooks/useMeetMessages";

// Your Google Cloud Project Number (from Google Cloud Console)
const CLOUD_PROJECT_NUMBER = "464731456038";

// Types matching the GM Pro extension settings
export interface Settings {
  isDark: boolean;
  autoDisableMic: boolean;
  autoDisableCamera: boolean;
  autoEnableTranscriptions: boolean;
  autoOpenChat: boolean;
  lobbyNotifier: boolean;
  joinMeetingDelay: number;
}

export interface FeatureFlags {
  isImageUploadingEnabled: boolean;
  isTranscriptionsEnabled: boolean;
  isSuperChatEnabled: boolean;
}

// Message types for communication with GM Pro extension
type MessageType =
  | "GM_PRO_ADDON_READY"
  | "GM_PRO_GET_SETTINGS"
  | "GM_PRO_SET_SETTINGS"
  | "GM_PRO_SETTINGS_UPDATE"
  | "GM_PRO_TOGGLE_CHAT"
  | "GM_PRO_FEATURE_FLAGS";

interface AddonMessage {
  type: MessageType;
  source: "gm-pro-addon";
  payload?: Partial<Settings> | string;
}

interface ExtensionMessage {
  type: MessageType;
  source: "gm-pro-extension";
  payload?: Settings | FeatureFlags;
}

const DEFAULT_SETTINGS: Settings = {
  isDark: true,
  autoDisableMic: false,
  autoDisableCamera: false,
  autoEnableTranscriptions: false,
  autoOpenChat: false,
  lobbyNotifier: false,
  joinMeetingDelay: -1,
};

const DEFAULT_FEATURE_FLAGS: FeatureFlags = {
  isImageUploadingEnabled: false,
  isTranscriptionsEnabled: true,
  isSuperChatEnabled: true,
};

// Send message to top-level window where extension content script runs
export const sendMessage = (
  type: MessageType,
  payload?: Partial<Settings> | string
) => {
  const message: AddonMessage = {
    type,
    source: "gm-pro-addon",
    payload,
  };

  // Post to window.top to reach the extension content script
  try {
    if (window.top && window.top !== window) {
      window.top.postMessage(message, "*");
    }
  } catch (e) {
    console.error("[GM Pro Add-on] Failed to post to top:", e);
  }
};

export default function AddonSidePanel() {
  const { user, isLoading: isUserLoading } = useAuthedUser();
  const localUserID = user?.id;
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [featureFlags, setFeatureFlags] = useState<FeatureFlags>(
    DEFAULT_FEATURE_FLAGS
  );
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [sdkInitialized, setSdkInitialized] = useState(false);
  const [meetingDetails, setMeetingDetails] = useState<MeetingInfo>();
  const connectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [sidePanelClient, setSidePanelClient] = useState<MeetSidePanelClient>();
  const meetMessages = useMeetMessages((state) => state.meetMessages);
  const previousMessageCountRef = useRef<number>(0);
  // Initialize Google Meet Add-on SDK only if meet_sdk param is present
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has("meet_sdk")) {
      // Don't initialize SDK if not running in Meet Add-on context
      return;
    }
    async function initMeetAddon() {
      try {
        const session = await meet.addon.createAddonSession({
          cloudProjectNumber: CLOUD_PROJECT_NUMBER,
        });
        const client = await session.createSidePanelClient();
        const details = await client.getMeetingInfo();
        setMeetingDetails(details);

        // Store client in zustand store for use in other components
        setSidePanelClient(client);

        setSdkInitialized(true);
        console.log("[GM Pro Add-on] Meet SDK initialized successfully");
      } catch (error) {
        console.error("[GM Pro Add-on] Failed to initialize Meet SDK:", error);
        // SDK initialization failure is not critical - addon can still work with extension
        setSdkInitialized(false);
      }
    }
    initMeetAddon();
  }, [setSidePanelClient]);

  // Notify other participants via Meet SDK when a new message appears
  useEffect(() => {
    const currentCount = meetMessages.length;
    const previousCount = previousMessageCountRef.current;

    // Only notify if there's a new message (count increased)
    if (currentCount > previousCount && previousCount > 0 && sidePanelClient) {
      const latestMessage = meetMessages[meetMessages.length - 1];

      // Only notify for messages from other users
      if (latestMessage && latestMessage.userId !== localUserID) {
        sidePanelClient
          .startActivity({
            additionalData: JSON.stringify({
              type: "new_chat_message",
              messageId: latestMessage.key,
              timestamp: latestMessage.timestamp,
            }),
          })
          .catch((error) => {
            console.error("[GM Pro Add-on] Failed to notify activity:", error);
          });
      }
    }

    previousMessageCountRef.current = currentCount;
  }, [meetMessages, sidePanelClient, localUserID]);

  // Handle incoming messages from extension
  const handleMessage = useCallback((event: MessageEvent) => {
    // Validate message is from GM Pro extension
    if (event.data?.source !== "gm-pro-extension") return;

    const message = event.data as ExtensionMessage;

    switch (message.type) {
      case "GM_PRO_SETTINGS_UPDATE":
        if (message.payload) {
          console.log("[GM Pro Add-on] Updating settings:", message.payload);
          setSettings(message.payload as Settings);
          setIsConnected(true);
          setIsLoading(false);
          if (connectionTimeoutRef.current) {
            clearTimeout(connectionTimeoutRef.current);
          }
        }
        break;
      case "GM_PRO_FEATURE_FLAGS":
        if (message.payload) {
          console.log(
            "[GM Pro Add-on] Updating feature flags:",
            message.payload
          );
          setFeatureFlags(message.payload as FeatureFlags);
        }
        break;
    }
  }, []);

  // Initialize connection to extension
  useEffect(() => {
    window.addEventListener("message", handleMessage);

    // Announce addon is ready and request settings
    sendMessage("GM_PRO_ADDON_READY");
    sendMessage("GM_PRO_GET_SETTINGS");

    // Set connection timeout - show helpful message if extension not found
    connectionTimeoutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => {
      window.removeEventListener("message", handleMessage);
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
      }
    };
  }, [handleMessage, sendMessage, isConnected]);

  // Update a setting
  const updateSetting = <K extends keyof Settings>(
    key: K,
    value: Settings[K]
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    sendMessage("GM_PRO_SET_SETTINGS", { [key]: value });
  };

  const isDark = settings.isDark;
  const loading = isLoading || isUserLoading;

  if (loading) {
    return (
      <GMProLayout>
        <Loading message="Connecting…" />
      </GMProLayout>
    );
  }

  if (!user) {
    return (
      <GMProLayout>
        <GoogleButton />
      </GMProLayout>
    );
  }

  if (isConnected) {
    return (
      <GMProLayout>
        <SettingsPanel
          settings={settings}
          isDark={isDark}
          featureFlags={featureFlags}
          updateSetting={updateSetting}
        />
      </GMProLayout>
    );
  }
  if (!meetingDetails?.meetingId) {
    return (
      <GMProLayout>
        <div style={{ padding: "20px" }}>
          <h2>GM Pro Extension Not Found</h2>
          <p>
            It looks like the GM Pro browser extension is not installed or
            enabled for this meeting. Please make sure you have the extension
            installed and try again.
          </p>
          <p>
            You can download the GM Pro extension from the Chrome Web Store.
          </p>
        </div>
      </GMProLayout>
    );
  }

  return <ChatApp currentMeetId={meetingDetails.meetingCode} />;
}
