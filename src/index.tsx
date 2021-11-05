import { inspect } from "@xstate/inspect";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "@/common/store";
import NotificationManager from "@/components/organisms/NotificationManager";

import configureStore from "./configureStore";
import "./utils/visibility";
import "./index.css";
import "./setupSentry";
import "./setupYup";

import { STATE_CHARTS } from "@/config";

if (STATE_CHARTS) {
  inspect({
    iframe: false,
  });
}

const engineStore = configureStore();

function render() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const App = require("./App").default;

  ReactDOM.render(
    <Provider store={store}>
      <NotificationManager />
      <App store={engineStore} />
    </Provider>,
    document.getElementById("root")
  );
}

render();

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./App", render);
}
