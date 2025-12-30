import React from "react";
import { auth } from "./init";
import { useAuthState } from "react-firebase-hooks/auth";

const useAuthedUser = () => {
  const [user] = useAuthState(auth);

  return user
    ? {
        id: user?.providerData?.[0]?.uid,
        email: user?.email,
        MeetEmail: user?.email,
        fullName: user?.displayName,
        profileImageUrl: user?.photoURL,
      }
    : null;
};

export default useAuthedUser;
