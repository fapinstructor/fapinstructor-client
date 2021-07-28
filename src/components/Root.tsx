import { Suspense } from "react";
import { Router } from "react-router-dom";
import history from "browserHistory";
import ErrorBoundary from "components/organisms/ErrorBoundary";
import { ProxyStoreProvider } from "containers/StoreProvider";
import Auth0Provider from "AuthProvider";
import Pages from "./Pages";
import { Store } from "store";
import LoadingPage from "./Pages/LoadingPage";
import NavBar from "./organisms/NavBar";

type RootProps = {
  store: Store;
};

export default function Root({ store }: RootProps) {
  return (
    <ErrorBoundary>
      <Router history={history}>
        <Suspense
          fallback={
            <>
              <NavBar />
              <LoadingPage />
            </>
          }
        >
          <Auth0Provider>
            <ProxyStoreProvider store={store}>
              <div
                style={{
                  height: "100vh",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Pages />
              </div>
            </ProxyStoreProvider>
          </Auth0Provider>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}
