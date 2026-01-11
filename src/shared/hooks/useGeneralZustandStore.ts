import { TenorImage } from "gif-picker-react";
import { create } from "zustand";

export type Reply = {
  text: string;
  userId?: string;
  side?: "left" | "right";
  id?: string;
  image?: string;
  isEdited?: boolean;
  editedText?: string;
  isSuperOnly?: boolean;
  timestamp?: number;
};

export interface UploadedImage {
  url: string;
  name?: string;
  contentType?: string;
}

interface Participant {
  id: string;
  name: string;
  email?: string;
  joinedAt?: string;
  leftAt?: string;
  status: "joined" | "left";
  type: "signed_in" | "anonymous" | "phone";
}

type Store = {
  message: string;
  setMessage: (message: string) => void;
  showNewMessageButton: boolean;
  setShowNewMessageButton: (showNewMessageButton: boolean) => void;
  reply?: Reply;
  setReply: (reply?: Reply) => void;
  image: UploadedImage | Partial<TenorImage> | null;
  setImage: (image: UploadedImage | Partial<TenorImage> | null) => void;
  editedMessageId: string;
  setEditedMessageId: (editedMessageId: string) => void;
  isShufflerOn: boolean;
  setIsShufflerOn: (isShufflerOn: boolean) => void;
  // Participants state
  participants: Participant[];
  setParticipants: (participants: Participant[]) => void;
  participantsLoading: boolean;
  setParticipantsLoading: (loading: boolean) => void;
  participantsError: string | null;
  setParticipantsError: (error: string | null) => void;
};

export const useZustandStore = create<Store>()((set) => ({
  message: "",
  setMessage: (message) => set((state) => ({ ...state, message })),
  showNewMessageButton: false,
  setShowNewMessageButton: (showNewMessageButton) =>
    set((state) => ({ ...state, showNewMessageButton })),
  reply: undefined,
  setReply: (reply) => set((state) => ({ ...state, reply })),
  image: null,
  setImage: (image) => set((state) => ({ ...state, image })),
  editedMessageId: "",
  setEditedMessageId: (editedMessageId) =>
    set((state) => ({ ...state, editedMessageId })),
  isShufflerOn: false,
  setIsShufflerOn: (isShufflerOn) =>
    set((state) => ({ ...state, isShufflerOn })),
  // Participants state
  participants: [],
  setParticipants: (participants) =>
    set((state) => ({ ...state, participants })),
  participantsLoading: false,
  setParticipantsLoading: (participantsLoading) =>
    set((state) => ({ ...state, participantsLoading })),
  participantsError: null,
  setParticipantsError: (participantsError) =>
    set((state) => ({ ...state, participantsError })),
}));
