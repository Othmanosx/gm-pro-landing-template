import { useState, useEffect, useMemo } from "react";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  where,
  query,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { database, firestoreDB } from "@root/src/shared/firebase";
import {
  onValue,
  ref,
  set,
  serverTimestamp as realtimeServerTimestamp,
} from "firebase/database";
import { create } from "zustand";
import { User } from "firebase/auth";
import useAuthedUser from "@root/src/firebase/useAuthedUser";

type Store = {
  users: User[];
  setUsers: (users: any[]) => void;
  activeUsers: User[];
  setActiveUsers: (users: any[]) => void;
  user: User;
  setUser: (user: User) => void;
};

export const useUsersStore = create<Store>()((set, get) => ({
  users: [],
  setUsers: (users) => set((state) => ({ ...state, users })),
  activeUsers: [],
  setActiveUsers: (users) => set((state) => ({ ...state, activeUsers: users })),
  user: {
    email: "",
    fullName: "",
    id: "",
    MeetEmail: "",
    profileImageUrl: "",
  },
  setUser: (user) => set((state) => ({ ...state, user })),
}));

export function useUsers({ currentMeetId }: { currentMeetId: string }) {
  const usersRef = ref(database, `rooms/${currentMeetId}/users`);
  const [isSavingUser, setIsSavingUser] = useState(true);
  const users = useUsersStore((state) => state.users);
  const setUsers = useUsersStore((state) => state.setUsers);
  const setActiveUsers = useUsersStore((state) => state.setActiveUsers);
  const setUser = useUsersStore((state) => state.setUser);

  const localUser = useAuthedUser();

  useEffect(() => {
    if (isSavingUser) return;
    onValue(usersRef, async (snapshot) => {
      const usersSnapshot = snapshot.val();
      const realtimeUsersIDs = Object.keys(usersSnapshot || {});
      const activeUsersIDs = Object.entries(usersSnapshot || {})
        .filter(([_, value]) => value !== 0)
        .map(([key]) => key);

      if (
        realtimeUsersIDs.length > 0 &&
        realtimeUsersIDs.length !== users?.length
      ) {
        const usersCollection = collection(firestoreDB, "users");
        const q = query(usersCollection, where("id", "in", realtimeUsersIDs));
        const querySnapshot = await getDocs(q);
        const users = querySnapshot.docs.map((doc) => doc.data());
        const activeUsers = users.filter((user) =>
          activeUsersIDs.includes(user.id)
        );
        setUsers(users);
        setActiveUsers(activeUsers);
      }
    });
  }, [isSavingUser, users?.length, setUsers, setActiveUsers]);

  const userFirebase = users?.find((user) => user.id === localUser?.id);
  const firebaseUserId = userFirebase?.id;

  const firebaseFullName = userFirebase?.fullName;
  const localFullName = localUser?.fullName;

  const firebaseProfileImageUrl = userFirebase?.profileImageUrl;
  const localProfileImageUrl = localUser?.profileImageUrl;

  const firebaseEmail = userFirebase?.email;
  const localEmail = localUser?.email;

  const firebaseMeetEmail = userFirebase?.MeetEmail;
  const localMeetEmail = localUser?.MeetEmail;

  const shouldUpdateUserDetails =
    firebaseFullName !== localFullName ||
    firebaseProfileImageUrl !== localProfileImageUrl ||
    firebaseEmail !== localEmail ||
    firebaseMeetEmail !== localMeetEmail;

  // TODO: remove this and use the useSettingsStore with createChromeStorageStateHookLocal instead to save and get the user from chrome storage after getting a fix for the rerender issue https://github.com/onikienko/use-chrome-storage/issues/469
  const memoizedLocalUser = useMemo(() => {
    return {
      id: localUser?.id,
      fullName: localUser?.fullName,
      profileImageUrl: localUser?.profileImageUrl,
      email: localUser?.email,
      MeetEmail: localUser?.MeetEmail,
    };
  }, [
    localUser?.id,
    localUser?.fullName,
    localUser?.profileImageUrl,
    localUser?.email,
    localUser?.MeetEmail,
  ]);

  useEffect(() => {
    const updateUser = async () => {
      const userData = {
        ...memoizedLocalUser,
        lastSeen: serverTimestamp(),
        lastMeeting: currentMeetId,
      };

      const userDoc = doc(firestoreDB, "users", localUser?.id);
      firebaseUserId
        ? await updateDoc(userDoc, userData)
        : await setDoc(userDoc, userData);
    };

    const addUserIdToRoom = async () => {
      await set(
        ref(database, `rooms/${currentMeetId}/users/${localUser?.id}`),
        realtimeServerTimestamp()
      );
    };

    if (localUser?.id && currentMeetId && shouldUpdateUserDetails) {
      updateUser()
        .then(() => addUserIdToRoom())
        .finally(() => setIsSavingUser(false));
    }
  }, [
    firebaseUserId,
    memoizedLocalUser,
    localUser?.id,
    shouldUpdateUserDetails,
  ]);

  useEffect(() => {
    if (!localUser?.id || !currentMeetId) return;

    const removeUserIdFromRoom = async () => {
      try {
        await set(
          ref(database, `rooms/${currentMeetId}/users/${localUser?.id}`),
          0
        );
      } catch (error) {
        console.error("Failed to remove user from room:", error);
      }
    };

    // Handle page/tab close or refresh
    const handleBeforeUnload = () => {
      removeUserIdFromRoom();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("pagehide", handleBeforeUnload);

    return () => {
      // Cleanup on component unmount
      removeUserIdFromRoom();
      // Remove event listeners
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("pagehide", handleBeforeUnload);
    };
  }, [localUser?.id, currentMeetId]);
}
