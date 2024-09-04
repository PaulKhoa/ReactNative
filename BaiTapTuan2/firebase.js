import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA4i0WYni-8SsrFLnoCfFhGXpcoZ0q7t8M",
  authDomain: "thongtincanhan-f7228.firebaseapp.com",
  projectId: "thongtincanhan-f7228",
  storageBucket: "thongtincanhan-f7228.appspot.com",
  messagingSenderId: "1020968904866",
  appId: "1:1020968904866:web:93cd8f3a8880e98f904ffb"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut };
