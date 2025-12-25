import { useEffect, useState, useCallback, useRef } from "react";
import {
  meet,
  MeetSidePanelClient,
} from "@googleworkspace/meet-addons/meet.addons";

import SettingsPanel from "../../src/components/SettingsPanel";
import ChatApp from "../../src/components/Chat/app";

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

  console.log("[GM Pro Add-on] Sending message:", type, payload);

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
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [featureFlags, setFeatureFlags] = useState<FeatureFlags>(
    DEFAULT_FEATURE_FLAGS
  );
  const [isConnected, setIsConnected] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [sidePanelClient, setSidePanelClient] =
    useState<MeetSidePanelClient | null>(null);
  const [sdkInitialized, setSdkInitialized] = useState(false);
  const connectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
        console.log({
          session,
          sidePanelClient,
        });

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
  }, []);

  // Handle incoming messages from extension
  const handleMessage = useCallback((event: MessageEvent) => {
    // Validate message is from GM Pro extension
    if (event.data?.source !== "gm-pro-extension") return;

    const message = event.data as ExtensionMessage;
    console.log("[GM Pro Add-on] Valid extension message:", message.type);

    switch (message.type) {
      case "GM_PRO_SETTINGS_UPDATE":
        if (message.payload) {
          console.log("[GM Pro Add-on] Updating settings:", message.payload);
          setSettings(message.payload as Settings);
          // setIsConnected(true);
          setIsLoading(false);
          setConnectionError(null);
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
      if (!isConnected) {
        setConnectionError(
          "GM Pro Chrome extension required. Install it to use this add-on."
        );
      }
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

  return (
    <>
      {/* Extension Connection Status */}
      {!isLoading && !isConnected && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            fontSize: "12px",
            padding: "8px",
            borderRadius: "8px",
            backgroundColor: isConnected
              ? isDark
                ? "rgba(52, 168, 83, 0.15)"
                : "rgba(52, 168, 83, 0.1)"
              : isDark
              ? "rgba(234, 67, 53, 0.15)"
              : "rgba(234, 67, 53, 0.1)",
            color: isConnected ? "#34a853" : "#ea4335",
            marginBottom: "12px",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: isConnected ? "#34a853" : "#ea4335",
            }}
          />
          Extension Not Connected
        </div>
      )}

      {/* Error State with Install Link */}
      {connectionError && !isConnected && !isLoading && (
        <div
          style={{
            backgroundColor: isDark ? "rgba(234, 67, 53, 0.1)" : "#fce8e6",
            borderRadius: "8px",
            padding: "12px",
            marginBottom: "12px",
            fontSize: "13px",
          }}
        >
          <p style={{ margin: "0 0 8px", lineHeight: 1.4 }}>
            {connectionError}
          </p>
          <a
            href="https://chromewebstore.google.com/detail/gm-pro/bfmgohplnhblcajmjhmcimjlikohiomh"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              color: "#1a73e8",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Install GM Pro Extension
            <span style={{ fontSize: "16px" }}>→</span>
          </a>
        </div>
      )}
      {!isLoading && (
        <SettingsPanel
          settings={settings}
          isDark={isDark}
          featureFlags={featureFlags}
          updateSetting={updateSetting}
        />
      )}
    </>
  );
}
