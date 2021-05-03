import React from "react";
import * as ReactDOM from "react-dom";

import App from "./App";

require("./index.css").default;

// <StrictMode> is not used as it conflicts with material-ui
const renderApp = (ReactApp: React.ComponentType) =>
  ReactDOM.render(<ReactApp />, document.getElementById("root") as HTMLElement);

renderApp(App);

if (module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;
    renderApp(NextApp);
  });
}
