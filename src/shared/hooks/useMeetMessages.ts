import { create } from "zustand";

type Store = {
  meetMessages: any[];
  setMeetMessages: (recentChatMessages: any[]) => void;
  transcriptions: any[];
  setTranscriptions: (transcriptions: any[]) => void;
  allMessages: any[];
  setAllMessages: (allMessages: any[]) => void;
  reset: () => void;
};

export const useMeetMessages = create<Store>()((set) => ({
  meetMessages: [],
  setMeetMessages: (newMessages) =>
    set((state) => ({ ...state, meetMessages: newMessages })),
  transcriptions: [],
  setTranscriptions: (transcriptions) =>
    set((state) => ({ ...state, transcriptions })),
  allMessages: [],
  setAllMessages: (allMessages) => set((state) => ({ ...state, allMessages })),
  reset: () => {
    set({ meetMessages: [], transcriptions: [], allMessages: [] });
  },
}));
