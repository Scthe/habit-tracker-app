import React, { StrictMode } from "react";
import * as ReactDOM from "react-dom";

import App from "./App";

require("./index.css").default;

const renderApp = (ReactApp: React.ComponentType) =>
  ReactDOM.render(
    <StrictMode>
      <ReactApp />
    </StrictMode>,
    document.getElementById("root") as HTMLElement
  );

renderApp(App);

if (module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;
    renderApp(NextApp);
  });
}
