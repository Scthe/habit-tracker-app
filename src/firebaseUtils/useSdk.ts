/* eslint-disable import/no-unused-modules */

/*
The MIT License (MIT)

Copyright (c) 2016 Firebase

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

// Changes:
//  * remove rxjs/Observables
//  * remove Proxy - it works without?
//  * remove `database` - I had some weird `@firebase/app` import probles. Use `firestore` anyway..
//  * (arguably) simplify
//
// Bascially we lazy-load in first `useSDK_NAME`. We require suspense to show loader while we load the libs.
// Throws if there was some actual problem.

import firebase from "firebase/app";
import { SuspenseSubject } from "./SuspenseSubject";
import { useFirebaseApp } from "./";

type ComponentName =
  | "analytics"
  | "auth"
  // | 'database'
  | "firestore"
  | "functions"
  | "messaging"
  | "performance"
  | "remoteConfig"
  | "storage";

type ValueOf<T> = T[keyof T];
type App = firebase.app.App;
type FirebaseNamespaceComponent = ValueOf<Pick<typeof firebase, ComponentName>>;

/** lazy import the required module. Returns promise that contains the module thingies */
function importSDK(sdk: ComponentName): Promise<unknown> {
  // prettier-ignore
  switch (sdk) {
    case "analytics": return import(/* webpackChunkName: "analytics" */ "firebase/analytics");
    case "auth": return import(/* webpackChunkName: "auth" */ "firebase/auth");
    // case 'database': return import(/* webpackChunkName: "database" */ 'firebase/database');
    case "firestore": return import(/* webpackChunkName: "firestore" */ "firebase/firestore");
    case "functions": return import(/* webpackChunkName: "functions" */ "firebase/functions");
    case "messaging": return import(/* webpackChunkName: "messaging" */ "firebase/messaging");
    case "performance": return import( /* webpackChunkName: "performance" */ "firebase/performance");
    case "remoteConfig": return import(/* webpackChunkName: "remoteConfig" */ "firebase/remote-config");
    case "storage": return import(/* webpackChunkName: "storage" */ "firebase/storage");
  }
}

// prettier-ignore
function proxyComponent(componentName: "auth"): typeof firebase.auth;
function proxyComponent(componentName: "analytics"): typeof firebase.analytics;
// function proxyComponent(componentName: 'database'): typeof firebase.database;
function proxyComponent(componentName: "firestore"): typeof firebase.firestore;
function proxyComponent(componentName: "functions"): typeof firebase.functions;
function proxyComponent(componentName: "messaging"): typeof firebase.messaging;
function proxyComponent(componentName: "performance"): typeof firebase.performance;
function proxyComponent(componentName: "remoteConfig"): typeof firebase.remoteConfig;
function proxyComponent(componentName: "storage"): typeof firebase.storage;
function proxyComponent(componentName: ComponentName): FirebaseNamespaceComponent {
  let contextualApp: App | undefined;

  /** This function only returns if module was loaded. It throws before that  */
  const useComponent = () => {
    contextualApp = useFirebaseApp();

    // access SDK from app or throw (will be caught by suspense)
    const sdkSubject = preload(componentName, contextualApp);
    sdkSubject.suspenseIfNeeded();

    return firebase[componentName]; // returns e.g. `firebase.auth`, we later call it so it's `firebase.auth()`
  };

  return ((app?: App) => {
    const componentFn = useComponent();
    return componentFn(app || contextualApp);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any;
}

export const useAuth = proxyComponent("auth");
export const useAnalytics = proxyComponent("analytics");
// export const useDatabase = proxyComponent('database');
export const useFirestore = proxyComponent("firestore");
export const useFunctions = proxyComponent("functions");
export const useMessaging = proxyComponent("messaging");
export const usePerformance = proxyComponent("performance");
export const useRemoteConfig = proxyComponent("remoteConfig");
export const useStorage = proxyComponent("storage");

interface PreloadOpts {
  firebaseApp: App;
}
type PreloadFn<componentName extends keyof App> = (
  opts: PreloadOpts
) => Promise<App[componentName]>;

// prettier-ignore
function preloadFactory(componentName: "auth"): PreloadFn<typeof componentName>;
function preloadFactory(componentName: "analytics"): PreloadFn<typeof componentName>;
// function preloadFactory(componentName: 'database'): PreloadFn<typeof componentName>;
function preloadFactory(componentName: "firestore"): PreloadFn<typeof componentName>;
function preloadFactory(componentName: "functions"): PreloadFn<typeof componentName>;
function preloadFactory(componentName: "messaging"): PreloadFn<typeof componentName>;
function preloadFactory(componentName: "performance"): PreloadFn<typeof componentName>;
function preloadFactory(componentName: "remoteConfig"): PreloadFn<typeof componentName>;
function preloadFactory(componentName: "storage"): PreloadFn<typeof componentName>;
function preloadFactory(componentName: ComponentName) {
  return (opts: PreloadOpts) =>
    preload(componentName, opts.firebaseApp).promise; // just await this, do not use the result..
}

type ComponentModulePromise = SuspenseSubject<App[ComponentName]>;
const firebaseModulesCache = new Map<ComponentName, ComponentModulePromise>();

function preload(
  componentName: ComponentName,
  firebaseApp: App
): ComponentModulePromise {
  // console.log(`Load firebase module '${componentName}'`);

  if (firebaseModulesCache.has(componentName)) {
    return firebaseModulesCache.get(componentName)!;
  }

  const promise = importSDK(componentName)
    .then(() => {
      // console.log(`Firebase module '${componentName}' loading SUCCESS`);
      // this is e.g. `app.auth` function
      const instanceFactory = firebaseApp[componentName].bind(firebaseApp);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return instanceFactory as any;
    })
    .catch(() => {
      // console.error(`Firebase module '${componentName}' loading ERROR`, e);
      throw new Error(`Could not lazy load firebase module '${componentName}'`);
    });

  const suspensePromise = new SuspenseSubject(promise);
  firebaseModulesCache.set(componentName, suspensePromise);
  return suspensePromise;
}

export const preloadAuth = preloadFactory("auth");
export const preloadAnalytics = preloadFactory("analytics");
// export const preloadDatabase = preloadFactory('database');
export const preloadFirestore = preloadFactory("firestore");
export const preloadFunctions = preloadFactory("functions");
export const preloadMessaging = preloadFactory("messaging");
export const preloadPerformance = preloadFactory("performance");
export const preloadRemoteConfig = preloadFactory("remoteConfig");
export const preloadStorage = preloadFactory("storage");
