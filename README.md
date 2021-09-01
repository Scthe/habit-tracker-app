
# Firebase + React + Material-UI example app ([DEMO](https://habit-tracker-app-f12cd.web.app))

Complete App that uses React to show UI and Firebase's Firestore for data persistence. Can be a good starting point for custom apps or just a reference how different elements of the tech stack interact with each other.



![Sample image - desktop](/gh-images/ui-desktop.png)

![Sample image - mobile](/gh-images/ui-mobile.png)


# Features


## Functionality

* From **landing page to login to app** - complete flow that every modern app implements
* **Responsive design** with routing and form persistence
* Configuration of different **webpack entry points** (app, landing page, login) that can be used for fast prototype
* **Authenticate using different providers** (Google, email, guest). Handles login, logout, per-user custom data, permissions etc.
* **Routing** using `react-router-dom` with Sentry support and tons of utils. **Code splitting by route** for lazy code/resources loading. Working with React Suspense.
* **Working forms with validation** and error handling using formik
* Most common **date utils** e.g. for different first day of the week, week day formatting, validation, date difference etc.
* custom **Material-UI color scheme** compatible with WCAG Level AAA
* **Error handling throughout whole app.** Fallbacks to `<ErrorBoundary>` on nearest parent level if possible. All error data (and tons of other stuff) is logged to Sentry for easier debugging


## Firebase

* Example **firebase configuration** for authentication with different providers, firestore etc.
* Data storage directly from React app using **Firestore with authentication rules**
* Utils for **Firestore async functions**
* Works with **Firestore subscriptions** to auto-update model after write operations. Automatic unsubscribtion after component is unmounted

## UI

* **Material-UI** with typical admin-like layout for fast prototyping
* **Tons of custom components** extending Material-UI, especially calendars, week selectors etc.
* `<ControlledTouchRipple>` component to **trigger Material Design Ripple effect on command**
* **Custom Page components system** to make adding new pages a breeze. `<AppLayout>` is prepared for error handling, lazy code loading, Suspense data load and default styles that make the page pretty-by-default.
* **Master-detail** layout with mobile as first-class citizen
* **Light/dark theme**
* Lists with build-in empty, error, loading states
* Handle routing errors/404s


## Tooling

* **React:** hooks only, using ErrorBoundaries and Suspense
* **100% TypeScript**
* **Sentry**
* **Google analytics** with utils. No excueses to not use if `logSimpleEvent('my-button-clicked')` auto-fills all other event data. And `<PageViewAnalytics>` will automatically send `page-view` event.
* **Preconfigured common react toolstack**: webpack, postcss, prettier, eslint, husky etc.
* **Build types:** production/development
* Tons of React utils: `useDocumentTitle`, `useGlobalKeyDown`, `useInterval`, `useLatest`, `useLocalStorage` etc.


# Used technology

* [Firebase v9](https://firebase.google.com/) (implemented just days after it was annouced on Google IO)
* [React](https://reactjs.org/) (with 100% hooks)
* [react-async-hook](https://github.com/slorber/react-async-hook)
* [Material-UI](https://material-ui.com/)
* [Formik](https://formik.org/)
* [Lodash](https://lodash.com/)
* [Sentry](https://sentry.io/welcome/)
* [date-fns](https://date-fns.org/) as basis for date handling
* [zustand](https://github.com/pmndrs/zustand) for storage
* [superstruct](https://github.com/ianstormtaylor/superstruct) for validation
* [Webpack](https://webpack.js.org/)
* [PostCSS](https://postcss.org/)
* [Prettier](https://prettier.io/)
* [eslint](https://eslint.org/)
* [Jest](https://jestjs.io/)