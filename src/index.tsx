import { inspect } from "@xstate/inspect";
import ReactDOM from "react-dom";

import { STATE_CHARTS } from "@/config";
import "@/config/setupSentry";
import "@/config/setupYup";

import "./utils/visibility";
import "./index.css";

if (STATE_CHARTS) {
  inspect({
    iframe: false,
  });
}

function render() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const App = require("./App").default;

  ReactDOM.render(<App />, document.getElementById("root"));
}

render();

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./App", render);
}
