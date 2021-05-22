require("./login.css").default;

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { firebaseConfig } from "firebaseUtils/firebase.config";

// TODO just don't import their css
// TODO [analytics] add sentry & google analytics for landing and login page too
// TODO add demo option. Either auto login with url parameter `?demo=true`
// or have predefined user. How to mock data for demo? Maybe popup/intro is good enough?
// TODO what if we are already logged?
// TODO yarn unplug firebase

// configure firebaseui that we got from CDN
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).firebase = firebase;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const firebaseui = (window as any).firebaseui;

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
