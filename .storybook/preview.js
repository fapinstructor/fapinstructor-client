import { Suspense } from "react";
import { MemoryRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "common/store";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  options: {
    storySort: {
      order: ["App", "Atoms", "Molecules", "Organisms"],
    },
  },
};

export const decorators = [
  (Story, { args: { route = "/" } }) => (
    <Provider store={store}>
      <Router initialEntries={[route]}>
        <Suspense fallback={<div>Loading...</div>}>
          <Story />
        </Suspense>
      </Router>
    </Provider>
  ),
];
