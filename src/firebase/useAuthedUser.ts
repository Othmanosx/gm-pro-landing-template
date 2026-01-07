import { auth } from "./init";
import { useAuthState } from "react-firebase-hooks/auth";

const useAuthedUser = () => {
  const [user, loading] = useAuthState(auth);
  // @ts-ignore
  const accessToken = user?.accessToken;

  const authedUser = user
    ? {
        id: user?.providerData?.[0]?.uid,
        accessToken,
        email: user?.email,
        MeetEmail: user?.email,
        fullName: user?.displayName,
        profileImageUrl: user?.photoURL,
      }
    : null;

  return { user: authedUser, isLoading: loading };
};

export default useAuthedUser;
