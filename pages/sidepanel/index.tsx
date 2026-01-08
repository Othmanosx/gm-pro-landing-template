import { useEffect, useState, useCallback, useRef } from "react";

import SettingsPanel from "../../src/components/SettingsPanel";
import ChatApp from "../../src/components/Chat/app";
import useAuthedUser from "@root/src/firebase/useAuthedUser";
import GMProLayout from "@root/src/components/GMProLayout";
import Loading from "@root/src/components/Loading";
import GoogleButton from "@root/src/components/GoogleButton";
import useMeetSdk from "@root/src/shared/hooks/useMeetSdk";
import { MeetParticipantsList } from "@root/src/components/MeetParticipantsList";

interface Participant {
  id: string;
  name: string;
  email?: string;
  joinedAt?: string;
  leftAt?: string;
  status: "joined" | "left";
  type: "signed_in" | "anonymous" | "phone";
}

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
  const { meetingDetails } = useMeetSdk();
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [featureFlags, setFeatureFlags] = useState<FeatureFlags>(
    DEFAULT_FEATURE_FLAGS
  );
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Participants state
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loadingParticipants, setLoadingParticipants] = useState(false);
  const [participantsError, setParticipantsError] = useState<string | null>(
    null
  );
  const [showParticipants, setShowParticipants] = useState(false);

  const connectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  // Fetch participants from the new API
  const fetchParticipants = async () => {
    if (!user?.accessToken) {
      setParticipantsError("User not authenticated");
      return;
    }

    // Use meetingDetails if available, otherwise use hardcoded space for testing
    const identifier =
      meetingDetails?.meetingCode ||
      meetingDetails?.meetingId ||
      "spaces/HdUdk6pT2qIB";

    setLoadingParticipants(true);
    setParticipantsError(null);

    try {
      const response = await fetch(
        `/api/meet/get-participants?spaceName=${encodeURIComponent(
          identifier
        )}`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();

      setParticipants(data.participants || []);
      setShowParticipants(true);
    } catch (error: any) {
      console.error("Error fetching participants:", error);
      setParticipantsError(error.message || "Failed to fetch participants");
    } finally {
      setLoadingParticipants(false);
    }
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
  // if (!meetingDetails?.meetingId) {
  //   return (
  //     <GMProLayout>
  //       <div style={{ padding: "20px" }}>
  //         <h2>GM Pro Add-on Not Found</h2>
  //         <p>
  //           It looks like the GM Pro browser add-on is not installed or enabled
  //           for this meeting. Please make sure you have the add-on installed and
  //           try again.
  //         </p>
  //         <p>You can download the GM Pro add-on from the Chrome Web Store.</p>
  //       </div>
  //     </GMProLayout>
  //   );
  // }
  console.log({ meetingDetails, token: user.accessToken });

  const activeParticipants = participants.filter((p) => p.status === "joined");
  const leftParticipants = participants.filter((p) => p.status === "left");

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <h1
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
      >
        Meet Participants
      </h1>

      {/* Meeting Details */}
      <div
        style={{
          padding: "16px",
          backgroundColor: "#f3f4f6",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h2
          style={{ fontSize: "16px", fontWeight: "600", marginBottom: "8px" }}
        >
          Meeting Details
        </h2>
        <div style={{ fontSize: "14px", color: "#6b7280" }}>
          <div>Meeting ID: {meetingDetails?.meetingId || "N/A"}</div>
          <div>Meeting Code: {meetingDetails?.meetingCode || "N/A"}</div>
          <div>User: {user?.email || "N/A"}</div>
        </div>
      </div>

      {/* Load Participants Button */}
      <button
        onClick={fetchParticipants}
        disabled={loadingParticipants || !user?.accessToken}
        style={{
          padding: "12px 24px",
          backgroundColor: loadingParticipants ? "#9ca3af" : "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "600",
          cursor: loadingParticipants ? "not-allowed" : "pointer",
          marginBottom: "20px",
          width: "100%",
        }}
      >
        {loadingParticipants ? "Loading..." : "Load Participants"}
      </button>

      {/* Error Message */}
      {participantsError && (
        <div
          style={{
            padding: "12px",
            backgroundColor: "#fee2e2",
            color: "#991b1b",
            borderRadius: "8px",
            marginBottom: "20px",
            fontSize: "14px",
          }}
        >
          Error: {participantsError}
        </div>
      )}

      {/* Participants List */}
      {showParticipants && !loadingParticipants && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>
              Active Participants ({activeParticipants.length})
            </h2>
            <button
              onClick={fetchParticipants}
              style={{
                padding: "6px 12px",
                backgroundColor: "#10b981",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Refresh
            </button>
          </div>

          {activeParticipants.length === 0 ? (
            <p style={{ color: "#6b7280", fontSize: "14px" }}>
              No active participants
            </p>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {activeParticipants.map((participant) => (
                <div
                  key={participant.id}
                  style={{
                    padding: "12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    backgroundColor: "#f0fdf4",
                  }}
                >
                  <div style={{ fontWeight: "600", marginBottom: "4px" }}>
                    {participant.name}
                  </div>
                  {participant.email && (
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#6b7280",
                        marginBottom: "4px",
                      }}
                    >
                      {participant.email}
                    </div>
                  )}
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>
                    Type: {participant.type} • Joined:{" "}
                    {participant.joinedAt
                      ? new Date(participant.joinedAt).toLocaleTimeString()
                      : "Unknown"}
                  </div>
                </div>
              ))}
            </div>
          )}

          {leftParticipants.length > 0 && (
            <div style={{ marginTop: "32px" }}>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  marginBottom: "12px",
                  color: "#6b7280",
                }}
              >
                Left ({leftParticipants.length})
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {leftParticipants.map((participant) => (
                  <div
                    key={participant.id}
                    style={{
                      padding: "12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      backgroundColor: "#f9fafb",
                    }}
                  >
                    <div style={{ fontWeight: "600", marginBottom: "4px" }}>
                      {participant.name}
                    </div>
                    {participant.email && (
                      <div
                        style={{
                          fontSize: "14px",
                          color: "#6b7280",
                          marginBottom: "4px",
                        }}
                      >
                        {participant.email}
                      </div>
                    )}
                    <div style={{ fontSize: "12px", color: "#6b7280" }}>
                      Type: {participant.type} • Left:{" "}
                      {participant.leftAt
                        ? new Date(participant.leftAt).toLocaleTimeString()
                        : "Unknown"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  // return <ChatApp currentMeetId={meetingDetails.meetingCode} />;
}
