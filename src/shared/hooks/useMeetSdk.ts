import { create } from "zustand";
import {
  meet,
  type MeetingInfo,
  type MeetSidePanelClient,
} from "@googleworkspace/meet-addons/meet.addons";
import { useEffect, useState } from "react";

// Your Google Cloud Project Number (from Google Cloud Console)
const CLOUD_PROJECT_NUMBER = "464731456038";

type MeetSdkStore = {
  sidePanelClient: MeetSidePanelClient | null;
  setSidePanelClient: (client: MeetSidePanelClient | null) => void;
  clear: () => void;
};

export const useMeetStore = create<MeetSdkStore>()((set) => ({
  sidePanelClient: null,
  setSidePanelClient: (client) => set({ sidePanelClient: client }),
  clear: () => set({ sidePanelClient: null }),
}));

const useMeetSdk = () => {
  const [meetingDetails, setMeetingDetails] = useState<MeetingInfo>();
  const [sidePanelClient, setSidePanelClient] = useState<MeetSidePanelClient>();
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

        console.log("[GM Pro Add-on] Meet SDK initialized successfully");
      } catch (error) {
        console.error("[GM Pro Add-on] Failed to initialize Meet SDK:", error);
        // SDK initialization failure is not critical - addon can still work with extension
      }
    }
    initMeetAddon();
  }, []);

  // Notify other participants via Meet SDK when a new message appears
  const startActivity = () => {
    // Only notify for messages from other users
    sidePanelClient
      ?.startActivity({
        sidePanelUrl: "https://www.gm-pro.online/sidepanel",
        additionalData: JSON.stringify({
          type: "new_chat_message",
        }),
      })
      .then((e) => {
        console.log("[GM Pro Add-on] Notified participants of new message", e);
      })
      .catch((error) => {
        console.error("[GM Pro Add-on] Failed to notify activity:", error);
      });
  };
  return { meetingDetails, sidePanelClient, startActivity };
};

export default useMeetSdk;
