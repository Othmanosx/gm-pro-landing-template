import { auth } from "./init";
import { useAuthState } from "react-firebase-hooks/auth";

const useAuthedUser = () => {
  const [user, loading] = useAuthState(auth);

  const authedUser = user
    ? {
        id: user?.providerData?.[0]?.uid,
        email: user?.email,
        MeetEmail: user?.email,
        fullName: user?.displayName,
        profileImageUrl: user?.photoURL,
      }
    : null;

  return { user: authedUser, isLoading: loading };
};

export default useAuthedUser;
