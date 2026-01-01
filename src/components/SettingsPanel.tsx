import { FeatureFlags, sendMessage, Settings } from "../../pages/sidepanel";

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
  // Toggle Super Chat
  const toggleSuperChat = () => {
    sendMessage("GM_PRO_TOGGLE_CHAT");
  };

  return (
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
          onChange={(checked) => updateSetting("autoDisableCamera", checked)}
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
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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
    </>
  );
};

export default SettingsPanel;
