
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD-HrWLQv00dI8YeNqtXjQgccANRlH3e0c",
  authDomain: "studio-2923382865-6a26f.firebaseapp.com",
  projectId: "studio-2923382865-6a26f",
  storageBucket: "studio-2923382865-6a26f.firebasestorage.app",
  messagingSenderId: "613828273307",
  appId: "1:613828273307:web:bdbde31d2678044fa8523e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
