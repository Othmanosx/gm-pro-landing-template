import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "./init";

export async function signInWithGoogleIdToken(accessToken?: string) {
  const credential = GoogleAuthProvider.credential(null, accessToken);
  const userCredential = await signInWithCredential(auth, credential);
  return userCredential.user;
}

export default signInWithGoogleIdToken;
