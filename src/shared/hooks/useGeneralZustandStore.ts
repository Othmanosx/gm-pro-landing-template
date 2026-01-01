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
}));
