import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore, Firestore } from "firebase/firestore";
import { createFirebaseREST, FirebaseRealtimeREST } from "./firebaseREST";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASEURL,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
};

let auth: Auth;
let database: ReturnType<typeof getDatabase>;
let firestoreDB: Firestore;
let databaseREST: FirebaseRealtimeREST;

const firebaseApp = initializeApp(firebaseConfig);

auth = getAuth(firebaseApp);

database = getDatabase(firebaseApp);

databaseREST = createFirebaseREST(
  firebaseConfig.databaseURL!,
  firebaseConfig.projectId!
);

firestoreDB = getFirestore(firebaseApp);

export {
  firebaseApp,
  auth,
  database,
  databaseREST,
  firestoreDB,
  firebaseConfig,
};
