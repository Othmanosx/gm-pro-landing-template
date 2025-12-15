import { useEffect, useState, useCallback, useRef } from "react";
import Head from "next/head";
import {
  meet,
  MeetSidePanelClient,
} from "@googleworkspace/meet-addons/meet.addons";

// Your Google Cloud Project Number (from Google Cloud Console)
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

export default function AddonSidePanel() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [featureFlags, setFeatureFlags] = useState<FeatureFlags>(
    DEFAULT_FEATURE_FLAGS
  );
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [sidePanelClient, setSidePanelClient] =
    useState<MeetSidePanelClient | null>(null);
  const [sdkInitialized, setSdkInitialized] = useState(false);
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

  // Send message to top-level window where extension content script runs
  const sendMessage = useCallback(
    (type: MessageType, payload?: Partial<Settings> | string) => {
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
    },
    []
  );

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
          setIsConnected(true);
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

  // Toggle Super Chat
  const toggleSuperChat = () => {
    sendMessage("GM_PRO_TOGGLE_CHAT");
  };

  const isDark = settings.isDark;

  // Styles that ensure no horizontal scrolling and responsive design
  const containerStyle: React.CSSProperties = {
    backgroundColor: isDark ? "#202124" : "#ffffff",
    color: isDark ? "#e8eaed" : "#202124",
    minHeight: "100vh",
    maxWidth: "100%",
    padding: "12px",
    fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
    overflowX: "hidden",
    boxSizing: "border-box",
  };

  return (
    <>
      <Head>
        <title>GM Pro - Meeting Settings</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content="GM Pro meeting enhancement settings"
        />
      </Head>

      <div style={containerStyle}>
        {/* Header with logo and status */}
        <header style={{ textAlign: "center", marginBottom: "12px" }}>
          <img
            src="https://lh3.googleusercontent.com/oEMr1ptQCg81T6dBLdb53OfI73whvbqyCvlZ7mt1UAFbRwFchkB29Cn2x_5KdpZURYDuulqGanQu3EfD3Tjmrd0f=s120"
            alt="GM Pro"
            width={48}
            height={48}
            style={{ borderRadius: "8px" }}
          />
          <h1
            style={{ fontSize: "16px", margin: "8px 0 4px", fontWeight: 500 }}
          >
            GM Pro
          </h1>
          <p
            style={{
              fontSize: "12px",
              color: isDark ? "#9aa0a6" : "#5f6368",
              margin: 0,
            }}
          >
            Enhance your Google Meet experience
          </p>
        </header>

        {/* Loading State */}
        {isLoading && (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <div
              style={{
                width: "24px",
                height: "24px",
                border: `2px solid ${isDark ? "#3c4043" : "#e8eaed"}`,
                borderTopColor: "#1a73e8",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto 12px",
              }}
            />
            <p
              style={{
                fontSize: "13px",
                color: isDark ? "#9aa0a6" : "#5f6368",
              }}
            >
              Connecting to extension...
            </p>
          </div>
        )}

        {/* Extension Connection Status */}
        {!isLoading && (
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
            {isConnected ? "Extension Connected" : "Extension Not Connected"}
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

        {/* Main Settings - Only show when connected or loading complete */}
        {!isLoading && (
          <>
            {/* Quick Actions */}
            <section style={{ marginBottom: "16px" }}>
              <SectionTitle isDark={isDark}>Quick Actions</SectionTitle>

              <ActionButton
                onClick={toggleSuperChat}
                disabled={!featureFlags.isSuperChatEnabled || !isConnected}
                isDark={isDark}
                icon="💬"
                label="Toggle Super Chat"
                description={
                  !featureFlags.isSuperChatEnabled
                    ? "Temporarily unavailable"
                    : !isConnected
                    ? "Connect extension first"
                    : "Enhanced chat experience"
                }
              />
            </section>

            {/* Meeting Settings */}
            <section style={{ marginBottom: "16px" }}>
              <SectionTitle isDark={isDark}>Meeting Settings</SectionTitle>

              <SettingRow
                label="Dark Mode"
                icon="🌙"
                checked={settings.isDark}
                onChange={(checked) => updateSetting("isDark", checked)}
                isDark={isDark}
                disabled={!isConnected}
              />

              <SettingRow
                label="Auto Mute Mic"
                icon="🎤"
                checked={settings.autoDisableMic}
                onChange={(checked) => updateSetting("autoDisableMic", checked)}
                isDark={isDark}
                disabled={!isConnected}
                description="Mute microphone when joining"
              />

              <SettingRow
                label="Auto Disable Camera"
                icon="📷"
                checked={settings.autoDisableCamera}
                onChange={(checked) =>
                  updateSetting("autoDisableCamera", checked)
                }
                isDark={isDark}
                disabled={!isConnected}
                description="Turn off camera when joining"
              />

              <SettingRow
                label="Auto Open Chat"
                icon="💬"
                checked={settings.autoOpenChat}
                onChange={(checked) => updateSetting("autoOpenChat", checked)}
                isDark={isDark}
                disabled={!isConnected}
                description="Open chat panel automatically"
              />

              <SettingRow
                label="Lobby Notifier"
                icon="🔔"
                checked={settings.lobbyNotifier}
                onChange={(checked) => updateSetting("lobbyNotifier", checked)}
                isDark={isDark}
                disabled={!isConnected}
                description="Sound alert when someone joins"
              />

              <SettingRow
                label="Auto Transcriptions"
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
                description={
                  !featureFlags.isTranscriptionsEnabled
                    ? "Temporarily unavailable"
                    : "Enable captions automatically"
                }
              />
            </section>

            {/* Auto Join Setting */}
            <section style={{ marginBottom: "16px" }}>
              <SectionTitle isDark={isDark}>Auto Join</SectionTitle>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 12px",
                  backgroundColor: isDark ? "#292a2d" : "#f8f9fa",
                  borderRadius: "8px",
                  opacity: !isConnected ? 0.5 : 1,
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <span>⏰</span>
                  <span style={{ fontSize: "14px" }}>Join Meeting</span>
                </div>
                <select
                  value={settings.joinMeetingDelay}
                  onChange={(e) =>
                    updateSetting("joinMeetingDelay", Number(e.target.value))
                  }
                  disabled={!isConnected}
                  style={{
                    padding: "6px 8px",
                    borderRadius: "4px",
                    border: `1px solid ${isDark ? "#5f6368" : "#dadce0"}`,
                    backgroundColor: isDark ? "#3c4043" : "#fff",
                    color: isDark ? "#e8eaed" : "#202124",
                    fontSize: "13px",
                    cursor: isConnected ? "pointer" : "not-allowed",
                    outline: "none",
                  }}
                >
                  <option value={-1}>Manual</option>
                  <option value={0}>Immediately</option>
                  <option value={1}>After 1 min</option>
                  <option value={2}>After 2 mins</option>
                  <option value={5}>After 5 mins</option>
                </select>
              </div>
            </section>

            {/* Footer */}
            <footer
              style={{
                textAlign: "center",
                fontSize: "11px",
                color: isDark ? "#9aa0a6" : "#5f6368",
                paddingTop: "8px",
                borderTop: `1px solid ${isDark ? "#3c4043" : "#e8eaed"}`,
              }}
            >
              <p style={{ margin: "4px 0" }}>
                Need help?{" "}
                <a
                  href="https://www.gm-pro.online/support"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#1a73e8", textDecoration: "none" }}
                >
                  Contact Support
                </a>
              </p>
              <p style={{ margin: "4px 0" }}>
                <a
                  href="https://www.gm-pro.online/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: isDark ? "#9aa0a6" : "#5f6368",
                    textDecoration: "none",
                  }}
                >
                  Privacy Policy
                </a>
                {" • "}
                <a
                  href="https://www.gm-pro.online/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: isDark ? "#9aa0a6" : "#5f6368",
                    textDecoration: "none",
                  }}
                >
                  Terms of Service
                </a>
              </p>
            </footer>
          </>
        )}
      </div>

      <style jsx global>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        html,
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        /* Ensure no horizontal scroll */
        body {
          max-width: 100vw;
          overflow-x: hidden;
        }
        /* Google-style focus ring */
        button:focus-visible,
        select:focus-visible,
        input:focus-visible {
          outline: 2px solid #1a73e8;
          outline-offset: 2px;
        }
      `}</style>
    </>
  );
}

// Section Title Component
function SectionTitle({
  children,
  isDark,
}: {
  children: React.ReactNode;
  isDark: boolean;
}) {
  return (
    <h2
      style={{
        fontSize: "11px",
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        color: isDark ? "#9aa0a6" : "#5f6368",
        marginBottom: "8px",
      }}
    >
      {children}
    </h2>
  );
}

// Action Button Component
interface ActionButtonProps {
  onClick: () => void;
  disabled: boolean;
  isDark: boolean;
  icon: string;
  label: string;
  description: string;
}

function ActionButton({
  onClick,
  disabled,
  isDark,
  icon,
  label,
  description,
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "100%",
        padding: "12px",
        backgroundColor: disabled
          ? isDark
            ? "#3c4043"
            : "#e8eaed"
          : "#1a73e8",
        color: disabled ? (isDark ? "#9aa0a6" : "#80868b") : "#ffffff",
        border: "none",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: 500,
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        transition: "background-color 0.2s",
      }}
    >
      <span style={{ fontSize: "18px" }}>{icon}</span>
      <div style={{ textAlign: "left" }}>
        <div>{label}</div>
        <div style={{ fontSize: "11px", fontWeight: 400, opacity: 0.8 }}>
          {description}
        </div>
      </div>
    </button>
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
  description?: string;
}

function SettingRow({
  label,
  icon,
  checked,
  onChange,
  isDark,
  disabled,
  description,
}: SettingRowProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 12px",
        backgroundColor: isDark ? "#292a2d" : "#f8f9fa",
        borderRadius: "8px",
        marginBottom: "6px",
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "default",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          flex: 1,
          minWidth: 0,
        }}
      >
        <span style={{ fontSize: "16px", flexShrink: 0 }}>{icon}</span>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: "14px", fontWeight: 400 }}>{label}</div>
          {description && (
            <div
              style={{
                fontSize: "11px",
                color: isDark ? "#9aa0a6" : "#5f6368",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {description}
            </div>
          )}
        </div>
      </div>
      <label
        style={{
          position: "relative",
          display: "inline-block",
          width: "36px",
          height: "20px",
          flexShrink: 0,
          marginLeft: "8px",
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
            position: "absolute",
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
            backgroundColor: checked
              ? "#1a73e8"
              : isDark
              ? "#5f6368"
              : "#dadce0",
            transition: "0.2s",
            borderRadius: "10px",
          }}
        >
          <span
            style={{
              position: "absolute",
              height: "16px",
              width: "16px",
              left: checked ? "18px" : "2px",
              bottom: "2px",
              backgroundColor: "#fff",
              transition: "0.2s",
              borderRadius: "50%",
              boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            }}
          />
        </span>
      </label>
    </div>
  );
}
