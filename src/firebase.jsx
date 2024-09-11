import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwTKl065nZSo-jtXgILeBFZXc0KAWg6xo",
  authDomain: "crm-edus.firebaseapp.com",
  projectId: "crm-edus",
  storageBucket: "crm-edus.appspot.com",
  messagingSenderId: "1077485307680",
  appId: "1:1077485307680:web:0d493122637e951e44f945",
  measurementId: "G-Z662DY2DYR"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

export { analytics, auth, db };
