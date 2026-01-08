import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/init";
import { signOut } from "firebase/auth";
import signInWithGoogleIdToken from "../firebase/authHelpers";
import useAuthedUser from "../firebase/useAuthedUser";

declare const google: any;

const GoogleButton = () => {
  const { user } = useAuthedUser();
  const [isInitializing, setIsInitializing] = useState(false);

  useEffect(() => {
    function GoogleLogin() {
      if (typeof window === "undefined" || typeof google === "undefined")
        return;

      // If user is signed in, don't initialize again
      if (user) {
        return;
      }

      if (isInitializing) return;
      setIsInitializing(true);

      // Initialize OAuth 2.0 client with proper scopes for Meet API
      const client = google.accounts.oauth2.initTokenClient({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        scope: [
          "https://www.googleapis.com/auth/userinfo.email",
          "https://www.googleapis.com/auth/userinfo.profile",
          "openid",
          // Meet API scopes
          "https://www.googleapis.com/auth/meetings.space.readonly",
          "https://www.googleapis.com/auth/meetings.space.created",
        ].join(" "),
        callback: async (response: any) => {
          if (response.error) {
            console.error("OAuth error:", response);
            setIsInitializing(false);
            return;
          }

          console.log("OAuth response received");
          const accessToken = response.access_token;

          try {
            // Store access token in localStorage for API calls
            localStorage.setItem("google_access_token", accessToken);
            localStorage.setItem(
              "google_access_token_expires_at",
              String(Date.now() + response.expires_in * 1000)
            );

            // Get user info and ID token using the access token
            const userInfoResponse = await fetch(
              "https://www.googleapis.com/oauth2/v3/userinfo",
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );
            const userInfo = await userInfoResponse.json();
            console.log("User info:", userInfo);

            // Get the ID token by using tokeninfo endpoint
            const tokenInfoResponse = await fetch(
              "https://www.googleapis.com/oauth2/v3/tokeninfo",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `access_token=${accessToken}`,
              }
            );
            const tokenInfo = await tokenInfoResponse.json();
            console.log("Token info:", tokenInfo);

            // For Firebase auth, we need to use Google Sign-In separately
            // Initialize the ID token flow for Firebase
            google.accounts.id.initialize({
              client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
              callback: async function (idResponse: any) {
                try {
                  const firebaseUser = await signInWithGoogleIdToken(
                    idResponse.credential,
                    accessToken
                  );
                  console.log("Signed into Firebase:", firebaseUser);

                  // Trigger event after Firebase sign-in
                  window.dispatchEvent(
                    new CustomEvent("google_access_token_updated", {
                      detail: { accessToken },
                    })
                  );

                  setIsInitializing(false);
                } catch (err) {
                  console.error("Failed to sign in with ID token:", err);
                  setIsInitializing(false);
                }
              },
            });

            // Trigger the One Tap sign-in for Firebase
            google.accounts.id.prompt((notification: any) => {
              if (
                notification.isNotDisplayed() ||
                notification.isSkippedMoment()
              ) {
                // Fallback: user is already signed in or dismissed
                console.log(
                  "One Tap not displayed, user may already be signed in"
                );
                window.dispatchEvent(
                  new CustomEvent("google_access_token_updated", {
                    detail: { accessToken },
                  })
                );
                setIsInitializing(false);
              }
            });
          } catch (err) {
            console.error("Failed to process OAuth response:", err);
            setIsInitializing(false);
          }
        },
      });

      // Store client for later use
      (window as any).googleOAuthClient = client;
    }
    GoogleLogin();
  }, [user, isInitializing]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("google_access_token");
      localStorage.removeItem("google_access_token_expires_at");
      console.log("Signed out");
    } catch (e) {
      console.error("Sign out failed:", e);
    }
  };

  const handleSignIn = () => {
    if ((window as any).googleOAuthClient) {
      (window as any).googleOAuthClient.requestAccessToken();
    } else {
      console.error("OAuth client not initialized");
    }
  };

  if (user) {
    return (
      <button
        className="fui-button fui-button--secondary"
        onClick={handleSignOut}
      >
        Sign out
      </button>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        gap: "16px",
      }}
    >
      <button
        onClick={handleSignIn}
        style={{
          padding: "12px 24px",
          backgroundColor: "#4285f4",
          color: "white",
          border: "none",
          borderRadius: "4px",
          fontSize: "16px",
          fontWeight: "500",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18">
          <path
            fill="#FFF"
            d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
          />
          <path
            fill="#FFF"
            d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"
          />
          <path
            fill="#FFF"
            d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707 0-.593.102-1.17.282-1.709V4.958H.957C.347 6.173 0 7.548 0 9c0 1.452.348 2.827.957 4.042l3.007-2.335z"
          />
          <path
            fill="#FFF"
            d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
          />
        </svg>
        Sign in with Google
      </button>
      <p
        style={{
          fontSize: "12px",
          color: "#666",
          textAlign: "center",
          maxWidth: "300px",
        }}
      >
        You'll be asked to grant access to Google Meet API
      </p>
    </div>
  );
};

export default GoogleButton;
