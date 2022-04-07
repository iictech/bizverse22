import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, updateProfile, GoogleAuthProvider, signInWithPopup, onAuthStateChanged} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc} from "firebase/firestore";

const provider = new GoogleAuthProvider();

const firebaseConfig = {
  apiKey: "AIzaSyAEluVyKeI4U_LtM0UTJGb28KVrvYSODMY",
  authDomain: "bizverse-2k22.firebaseapp.com",
  projectId: "bizverse-2k22",
  storageBucket: "bizverse-2k22.appspot.com",
  messagingSenderId: "459582380513",
  appId: "1:459582380513:web:b5707192b56813c87b5aa0",
  measurementId: "G-Q0W66T04SV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth();

export { db,analytics, auth, updateProfile, provider, signInWithPopup, onAuthStateChanged, doc, setDoc,getDoc };
export default app;