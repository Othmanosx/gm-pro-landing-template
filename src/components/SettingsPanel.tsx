import { FeatureFlags, sendMessage, Settings } from "../../pages/sidepanel";
import GoogleButton from "../../src/components/GoogleButton";
import Head from "next/head";

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

type Props = {
  settings: Settings;
  isDark: boolean;
  featureFlags: FeatureFlags;
  updateSetting: (key: keyof Settings, value: any) => void;
};

const SettingsPanel = ({
  settings,
  isDark,
  featureFlags,
  updateSetting,
}: Props) => {
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
    display: "flex",
    flexDirection: "column",
  };

  // Toggle Super Chat
  const toggleSuperChat = () => {
    sendMessage("GM_PRO_TOGGLE_CHAT");
  };

  return (
    <div>
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
            style={{ borderRadius: "8px", justifySelf: "center" }}
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
            For Google Meet™
          </p>
        </header>

        {/* Main Settings - Only show when connected or loading complete */}
        <>
          {/* Quick Actions */}
          <section style={{ marginBottom: "16px" }}>
            <SectionTitle isDark={isDark}>Quick Actions</SectionTitle>

            <ActionButton
              onClick={toggleSuperChat}
              disabled={!featureFlags.isSuperChatEnabled}
              isDark={isDark}
              icon="💬"
              label="Toggle Super Chat"
              description={
                !featureFlags.isSuperChatEnabled
                  ? "Temporarily unavailable"
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
            />

            <SettingRow
              label="Auto Mute Mic"
              icon="🎤"
              checked={settings.autoDisableMic}
              onChange={(checked) => updateSetting("autoDisableMic", checked)}
              isDark={isDark}
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
              description="Turn off camera when joining"
            />

            <SettingRow
              label="Auto Open Chat"
              icon="💬"
              checked={settings.autoOpenChat}
              onChange={(checked) => updateSetting("autoOpenChat", checked)}
              isDark={isDark}
              description="Open chat panel automatically"
            />

            <SettingRow
              label="Lobby Notifier"
              icon="🔔"
              checked={settings.lobbyNotifier}
              onChange={(checked) => updateSetting("lobbyNotifier", checked)}
              isDark={isDark}
              description="Sound alert when someone joins"
            />

            {/* <SettingRow
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
              /> */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 12px",
                backgroundColor: isDark ? "#292a2d" : "#f8f9fa",
                borderRadius: "8px",
                opacity: 1,
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
                style={{
                  padding: "6px 8px",
                  borderRadius: "4px",
                  border: `1px solid ${isDark ? "#5f6368" : "#dadce0"}`,
                  backgroundColor: isDark ? "#3c4043" : "#fff",
                  color: isDark ? "#e8eaed" : "#202124",
                  fontSize: "13px",
                  cursor: "pointer",
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
              marginTop: "auto",
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
            <p style={{ margin: "4px 0", fontSize: "10px" }}>
              Google Meet™ is a trademark of Google LLC
            </p>
          </footer>
        </>
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
    </div>
  );
};

export default SettingsPanel;
