import React from "react";
import ReactDOM from "react-dom";
import "./polyfills/endsWith";
import "./polyfills/performance";
import "./polyfills/includes";
import "./polyfills/entries";
import "./utils/visibility";
import "./index.css";
import "./setupSentry";
import configureStore from "./configureStore";
import { Provider } from "react-redux";
import store from "common/store";
import NotificationManager from "components/organisms/NotificationManager";
import { inspect } from "@xstate/inspect";

if (process.env.NODE_ENV === "development") {
  inspect({
    iframe: false,
  });
}

const engineStore = configureStore();

function render() {
  const Root = require("./components/Root").default;

  ReactDOM.render(
    <Provider store={store}>
      <NotificationManager />
      <Root store={engineStore} />
    </Provider>,
    document.getElementById("root")
  );
}

render();

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./components/Root", render);
}
