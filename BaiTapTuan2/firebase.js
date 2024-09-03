// firebase.js
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA4i0WYni-8SsrFLnoCfFhGXpcoZ0q7t8M",
    authDomain: "thongtincanhan-f7228.firebaseapp.com",
    projectId: "thongtincanhan-f7228",
    storageBucket: "thongtincanhan-f7228.appspot.com",
    messagingSenderId: "1020968904866",
    appId: "1:1020968904866:web:93cd8f3a8880e98f904ffb"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export { firebase };
