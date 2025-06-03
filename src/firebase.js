// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB3Gnqm9bI1XRY-SNzIGipQGBH56MlTSh8",
  authDomain: "prodbynoonezzz.firebaseapp.com",
  projectId: "prodbynoonezzz",
  storageBucket: "prodbynoonezzz.appspot.com",
  messagingSenderId: "177193965825",
  appId: "1:177193965825:web:eebebc07728496ff4f6300",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };