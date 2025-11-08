
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2NzuxN04ATADSi4nuRsmkwWRiy9nYLFk",
  authDomain: "nextgensde-sihah.firebaseapp.com",
  projectId: "nextgensde-sihah",
  storageBucket: "nextgensde-sihah.firebasestorage.app",
  messagingSenderId: "272842022438",
  appId: "1:272842022438:web:580d41afc6d1eff14f90e7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db };

