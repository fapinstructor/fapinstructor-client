import { Suspense, PropsWithChildren } from "react";
import {
  render as rtlRender,
  screen,
  RenderOptions,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import Auth0TestProvider, {
  Auth,
} from "@/providers/AuthProvider/Auth0TestProvider";
import { Provider } from "react-redux";
import store from "@/common/store";

type Options = RenderOptions & {
  route?: string;
  auth?: Auth;
};

type WrapperProps = PropsWithChildren<Options>;

export async function waitForSuspense() {
  const result = screen.queryAllByText("Loading...");
  if (result.length > 0) {
    await waitForElementToBeRemoved(result);
  }
}

export function render(
  ui: React.ReactElement,
  { route = "/", auth, ...options }: Options = {}
) {
  function Wrapper({ children }: WrapperProps) {
    return (
      <Provider store={store}>
        <Auth0TestProvider {...auth}>
          <Router initialEntries={[route]}>
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </Router>
        </Auth0TestProvider>
      </Provider>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

export * from "@testing-library/react";
