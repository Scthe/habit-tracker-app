require("./login.css").default;

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import * as firebaseui from "firebaseui";

import { firebaseConfig } from "firebaseUtils/firebase.config";

// TODO add sentry & google analytics

// Firebase config
firebase.initializeApp(firebaseConfig);

// FirebaseUI config
const uiConfig = {
  signInSuccessUrl: "/app",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
  ],
};

// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start("#firebaseui-auth-container", uiConfig);
