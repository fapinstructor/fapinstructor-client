import { Suspense } from "react";
import { Router } from "react-router-dom";

import history from "@/browserHistory";
import ErrorBoundary from "@/components/organisms/ErrorBoundary";
import { ProxyStoreProvider } from "@/providers/ProxyStoreProvider";
import Auth0Provider from "@/providers/AuthProvider";
import { Store } from "@/store";
import { Loading } from "@/features/misc";
import NavBar from "@/components/organisms/NavBar";
import { AppRoutes } from "@/routes";

type AppProps = {
  store: Store;
};

export default function Root({ store }: AppProps) {
  return (
    <ErrorBoundary>
      <Router history={history}>
        <Suspense
          fallback={
            <>
              <NavBar />
              <Loading />
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
                <AppRoutes />
              </div>
            </ProxyStoreProvider>
          </Auth0Provider>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}
