import { initializeApp } from "firebase/app";
import { getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updateEmail,
  updateProfile,
  signOut
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAbaCYE-1AK-cS_0K2KV96j6v441IALna8",
  authDomain: "messages-app-mapo.firebaseapp.com",
  projectId: "messages-app-mapo",
  storageBucket: "messages-app-mapo.appspot.com",
  messagingSenderId: "729007190598",
  appId: "1:729007190598:web:8afc637ad41e301da29047",
  measurementId: "G-VMTPSB6HG4",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "tr";

export {auth, RecaptchaVerifier, signInWithPhoneNumber, updateEmail, updateProfile,signOut}

