import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/init";
import { signOut } from "firebase/auth";
import signInWithGoogleIdToken from "../firebase/authHelpers";
import useAuthedUser from "../firebase/useAuthedUser";

declare const google: any;

const GoogleButton = () => {
  const { user } = useAuthedUser();

  useEffect(() => {
    function GoogleLogin() {
      if (typeof window === "undefined" || typeof google === "undefined")
        return;

      // If user is signed in, cancel any One Tap prompts and don't initialize again
      if (user) {
        try {
          google.accounts.id.cancel();
        } catch (e) {
          // ignore if cancel not supported
        }
        return;
      }

      google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback: async function (response: any) {
          // response.credential is the Google ID token (JWT)
          try {
            const firebaseUser = await signInWithGoogleIdToken(
              response.credential
            );
            console.log("Signed into Firebase via ID token:", firebaseUser);
          } catch (err) {
            console.error("Failed to sign in with ID token:", err);
          }
        },
      });

      google.accounts.id.renderButton(
        document.getElementById("googleSignInButton"),
        { theme: "outline", size: "large" } // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
    }
    GoogleLogin();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("Signed out");
    } catch (e) {
      console.error("Sign out failed:", e);
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
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <div id="googleSignInButton" dir="auto" />
    </div>
  );
};

export default GoogleButton;
