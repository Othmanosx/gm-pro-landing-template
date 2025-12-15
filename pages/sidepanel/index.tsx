import { useEffect, useState, useCallback, useRef } from "react";
import Head from "next/head";
import {
  meet,
  MeetSidePanelClient,
} from "@googleworkspace/meet-addons/meet.addons";

// Your Google Cloud Project Number (from Google Cloud Console)
// This must match the project where you configured the Add-on
const CLOUD_PROJECT_NUMBER = "464731456038";

// Types matching the GM Pro extension settings
interface Settings {
  isDark: boolean;
  autoDisableMic: boolean;
  autoDisableCamera: boolean;
  autoEnableTranscriptions: boolean;
  autoOpenChat: boolean;
  lobbyNotifier: boolean;
  joinMeetingDelay: number;
}

interface FeatureFlags {
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
  isDark: false,
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

export default function AddonSidePanel() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [featureFlags, setFeatureFlags] = useState<FeatureFlags>(
    DEFAULT_FEATURE_FLAGS
  );
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [sidePanelClient, setSidePanelClient] =
    useState<MeetSidePanelClient | null>(null);
  const [sdkError, setSdkError] = useState<string | null>(null);
  const connectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Google Meet Add-on SDK
  useEffect(() => {
    async function initMeetAddon() {
      try {
        const session = await meet.addon.createAddonSession({
          cloudProjectNumber: CLOUD_PROJECT_NUMBER,
        });
        const client = await session.createSidePanelClient();
        setSidePanelClient(client);
        console.log("[GM Pro Add-on] Meet SDK initialized successfully");
      } catch (error) {
        console.error("[GM Pro Add-on] Failed to initialize Meet SDK:", error);
        setSdkError(
          error instanceof Error
            ? error.message
            : "Failed to initialize Meet Add-on SDK"
        );
      }
    }

    initMeetAddon();
  }, []);

  // Send message to top-level window where extension content script runs
  const sendMessage = useCallback(
    (type: MessageType, payload?: Partial<Settings> | string) => {
      const message: AddonMessage = {
        type,
        source: "gm-pro-addon",
        payload,
      };

      console.log("[GM Pro Add-on] Sending message:", type, payload);

      // The Add-on runs in a deeply nested iframe structure
      // We need to post to window.top to reach the extension content script
      // which runs in the main meet.google.com frame
      try {
        // Post to the top-level window (meet.google.com)
        if (window.top && window.top !== window) {
          window.top.postMessage(message, "https://meet.google.com");
        }
      } catch (e) {
        // If blocked by same-origin policy, try with '*'
        console.log("[GM Pro Add-on] Trying wildcard origin");
        try {
          window.top?.postMessage(message, "*");
        } catch (e2) {
          console.error("[GM Pro Add-on] Failed to post to top:", e2);
        }
      }

      // Also traverse up the parent chain in case of nested iframes
      let currentWindow: Window | null = window.parent;
      while (currentWindow && currentWindow !== window) {
        try {
          currentWindow.postMessage(message, "*");
        } catch {
          // Ignore cross-origin errors
        }
        if (currentWindow === currentWindow.parent) break;
        currentWindow = currentWindow.parent;
      }
    },
    []
  );

  // Handle incoming messages from extension
  const handleMessage = useCallback((event: MessageEvent) => {
    // Validate message is from GM Pro extension
    if (event.data?.source !== "gm-pro-extension") return;

    const message = event.data as ExtensionMessage;

    switch (message.type) {
      case "GM_PRO_SETTINGS_UPDATE":
        if (message.payload) {
          setSettings(message.payload as Settings);
          setIsConnected(true);
          setConnectionError(null);
          if (connectionTimeoutRef.current) {
            clearTimeout(connectionTimeoutRef.current);
          }
        }
        break;
      case "GM_PRO_FEATURE_FLAGS":
        if (message.payload) {
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

    // Set connection timeout
    connectionTimeoutRef.current = setTimeout(() => {
      if (!isConnected) {
        setConnectionError(
          "Unable to connect to GM Pro extension. Make sure the extension is installed."
        );
      }
    }, 3000);

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

  // Toggle Super Chat
  const toggleSuperChat = () => {
    sendMessage("GM_PRO_TOGGLE_CHAT");
  };

  const isDark = settings.isDark;

  return (
    <>
      <Head>
        <title>GM Pro Settings</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div
        style={{
          backgroundColor: isDark ? "#2f2f2f" : "#ffffff",
          color: isDark ? "#ffffff" : "#000000",
          minHeight: "100vh",
          padding: "16px",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        {/* Header */}
        <header style={{ textAlign: "center", marginBottom: "16px" }}>
          <img
            src="https://lh3.googleusercontent.com/oEMr1ptQCg81T6dBLdb53OfI73whvbqyCvlZ7mt1UAFbRwFchkB29Cn2x_5KdpZURYDuulqGanQu3EfD3Tjmrd0f=s120"
            alt="GM Pro Logo"
            width={70}
            height={70}
            style={{ borderRadius: "12px" }}
          />
          <h1 style={{ fontSize: "16px", margin: "8px 0 4px" }}>
            GM Pro Settings
          </h1>

          {/* SDK Status */}
          {sdkError && (
            <div
              style={{
                fontSize: "11px",
                color: "#f44336",
                marginBottom: "4px",
              }}
            >
              SDK: {sdkError}
            </div>
          )}

          {/* Extension Connection Status */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              fontSize: "12px",
              color: isConnected
                ? "#4caf50"
                : connectionError
                ? "#f44336"
                : "#ff9800",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: isConnected
                  ? "#4caf50"
                  : connectionError
                  ? "#f44336"
                  : "#ff9800",
              }}
            />
            {isConnected
              ? "Extension Connected"
              : connectionError
              ? "Extension Not Found"
              : "Connecting..."}
          </div>
        </header>

        {connectionError && !isConnected && (
          <div
            style={{
              backgroundColor: isDark ? "#3d2020" : "#ffebee",
              border: `1px solid ${isDark ? "#5c3030" : "#ffcdd2"}`,
              borderRadius: "8px",
              padding: "12px",
              marginBottom: "16px",
              fontSize: "13px",
            }}
          >
            {connectionError}
            <div style={{ marginTop: "8px" }}>
              <a
                href="https://chromewebstore.google.com/detail/bfmgohplnhblcajmjhmcimjlikohiomh"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: isDark ? "#90caf9" : "#1976d2" }}
              >
                Install GM Pro Extension →
              </a>
            </div>
          </div>
        )}

        {/* Toggle Super Chat Button */}
        <button
          onClick={toggleSuperChat}
          disabled={!featureFlags.isSuperChatEnabled || !isConnected}
          style={{
            width: "100%",
            padding: "12px 16px",
            backgroundColor:
              featureFlags.isSuperChatEnabled && isConnected
                ? "#1976d2"
                : "#9e9e9e",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 500,
            cursor:
              featureFlags.isSuperChatEnabled && isConnected
                ? "pointer"
                : "not-allowed",
            marginBottom: "16px",
            transition: "background-color 0.2s",
          }}
          title={
            !featureFlags.isSuperChatEnabled
              ? "Super Chat is temporarily disabled"
              : !isConnected
              ? "Connect to extension first"
              : "Toggle the enhanced Super Chat feature"
          }
        >
          Toggle Super Chat
        </button>

        <Divider isDark={isDark} />

        {/* Settings Toggles */}
        <SettingRow
          label="Dark Mode"
          icon="🌙"
          checked={settings.isDark}
          onChange={(checked) => updateSetting("isDark", checked)}
          isDark={isDark}
          disabled={!isConnected}
        />

        <Divider isDark={isDark} />

        <SettingRow
          label="Auto Mute Mic"
          icon="🎤"
          checked={settings.autoDisableMic}
          onChange={(checked) => updateSetting("autoDisableMic", checked)}
          isDark={isDark}
          disabled={!isConnected}
        />

        <Divider isDark={isDark} />

        <SettingRow
          label="Auto Disable Camera"
          icon="📷"
          checked={settings.autoDisableCamera}
          onChange={(checked) => updateSetting("autoDisableCamera", checked)}
          isDark={isDark}
          disabled={!isConnected}
        />

        <Divider isDark={isDark} />

        <SettingRow
          label="Transcriptions (Beta)"
          icon="📝"
          checked={
            settings.autoEnableTranscriptions &&
            featureFlags.isTranscriptionsEnabled
          }
          onChange={(checked) =>
            updateSetting("autoEnableTranscriptions", checked)
          }
          isDark={isDark}
          disabled={!isConnected || !featureFlags.isTranscriptionsEnabled}
          tooltip={
            !featureFlags.isTranscriptionsEnabled
              ? "Temporarily disabled"
              : undefined
          }
        />

        <Divider isDark={isDark} />

        <SettingRow
          label="Auto Open Chat"
          icon="💬"
          checked={settings.autoOpenChat}
          onChange={(checked) => updateSetting("autoOpenChat", checked)}
          isDark={isDark}
          disabled={!isConnected}
        />

        <Divider isDark={isDark} />

        <SettingRow
          label="Lobby Notifier"
          icon="🔔"
          checked={settings.lobbyNotifier}
          onChange={(checked) => updateSetting("lobbyNotifier", checked)}
          isDark={isDark}
          disabled={!isConnected}
          tooltip="Plays a sound when someone joins while you're in the lobby"
        />

        <Divider isDark={isDark} />

        {/* Auto Join Meeting Dropdown */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 0",
            opacity: !isConnected ? 0.5 : 1,
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "14px",
            }}
          >
            <span>⏰</span>
            Auto Join Meeting
          </span>
          <select
            value={settings.joinMeetingDelay}
            onChange={(e) =>
              updateSetting("joinMeetingDelay", Number(e.target.value))
            }
            disabled={!isConnected}
            style={{
              padding: "6px 10px",
              borderRadius: "6px",
              border: `1px solid ${isDark ? "#555" : "#ddd"}`,
              backgroundColor: isDark ? "#424242" : "#fff",
              color: isDark ? "#fff" : "#000",
              fontSize: "13px",
              cursor: isConnected ? "pointer" : "not-allowed",
            }}
          >
            <option value={-1}>Off</option>
            <option value={0}>Immediately</option>
            <option value={1}>After 1 min</option>
            <option value={2}>After 2 mins</option>
            <option value={5}>After 5 mins</option>
          </select>
        </div>

        <Divider isDark={isDark} />

        {/* Footer */}
        <footer
          style={{
            marginTop: "20px",
            textAlign: "center",
            fontSize: "12px",
            color: isDark ? "#888" : "#666",
          }}
        >
          <a
            href="https://chromewebstore.google.com/detail/bfmgohplnhblcajmjhmcimjlikohiomh"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: isDark ? "#90caf9" : "#1976d2",
              textDecoration: "none",
            }}
          >
            Get GM Pro Extension
          </a>
        </footer>
      </div>

      <style jsx global>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        body {
          margin: 0;
          padding: 0;
        }
      `}</style>
    </>
  );
}

// Divider component
function Divider({ isDark }: { isDark: boolean }) {
  return (
    <hr
      style={{
        border: "none",
        borderTop: `1px solid ${isDark ? "#555" : "#e0e0e0"}`,
        margin: "12px 0",
      }}
    />
  );
}

// Setting Row with Toggle Switch
interface SettingRowProps {
  label: string;
  icon: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  isDark: boolean;
  disabled?: boolean;
  tooltip?: string;
}

function SettingRow({
  label,
  icon,
  checked,
  onChange,
  isDark,
  disabled,
  tooltip,
}: SettingRowProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 0",
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "default",
      }}
      title={tooltip}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "14px",
        }}
      >
        <span>{icon}</span>
        {label}
        {tooltip && (
          <span style={{ fontSize: "12px", color: isDark ? "#888" : "#666" }}>
            ℹ️
          </span>
        )}
      </span>
      <label
        style={{
          position: "relative",
          display: "inline-block",
          width: "48px",
          height: "26px",
        }}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          disabled={disabled}
          style={{
            opacity: 0,
            width: 0,
            height: 0,
          }}
        />
        <span
          style={{
            position: "absolute",
            cursor: disabled ? "not-allowed" : "pointer",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: checked ? "#1976d2" : isDark ? "#555" : "#ccc",
            transition: "0.3s",
            borderRadius: "26px",
          }}
        >
          <span
            style={{
              position: "absolute",
              content: '""',
              height: "20px",
              width: "20px",
              left: checked ? "25px" : "3px",
              bottom: "3px",
              backgroundColor: "#fff",
              transition: "0.3s",
              borderRadius: "50%",
            }}
          />
        </span>
      </label>
    </div>
  );
}
