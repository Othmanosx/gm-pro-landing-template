import { auth } from "./init";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

const useAuthedUser = () => {
  const [user, loading] = useAuthState(auth);
  const [googleAccessToken, setGoogleAccessToken] = useState<string | null>(
    null
  );

  // Listen for Google OAuth access token updates
  useEffect(() => {
    // Check if token exists in localStorage
    const storedToken = localStorage.getItem("google_access_token");
    const expiresAt = localStorage.getItem("google_access_token_expires_at");

    if (storedToken && expiresAt) {
      const now = Date.now();
      if (now < parseInt(expiresAt)) {
        setGoogleAccessToken(storedToken);
      } else {
        // Token expired, remove it
        localStorage.removeItem("google_access_token");
        localStorage.removeItem("google_access_token_expires_at");
      }
    }

    // Listen for token updates
    const handleTokenUpdate = (event: any) => {
      setGoogleAccessToken(event.detail.accessToken);
    };

    window.addEventListener("google_access_token_updated", handleTokenUpdate);

    return () => {
      window.removeEventListener(
        "google_access_token_updated",
        handleTokenUpdate
      );
    };
  }, []);

  const authedUser = user
    ? {
        id: user?.providerData?.[0]?.uid,
        // Use Google OAuth access token if available, otherwise fall back to Firebase token
        accessToken: googleAccessToken || (user as any)?.accessToken,
        email: user?.email,
        MeetEmail: user?.email,
        fullName: user?.displayName,
        profileImageUrl: user?.photoURL,
      }
    : null;

  return { user: authedUser, isLoading: loading };
};

export default useAuthedUser;
