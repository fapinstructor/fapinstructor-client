import { Suspense } from "react";
import { Router } from "react-router-dom";

import history from "@/browserHistory";
import ErrorBoundary from "@/components/organisms/ErrorBoundary";
import { ProxyStoreProvider } from "@/containers/StoreProvider";
import Auth0Provider from "@/providers/AuthProvider";
import { Store } from "@/store";
import LoadingPage from "@/components/Pages/LoadingPage";
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
                <AppRoutes />
              </div>
            </ProxyStoreProvider>
          </Auth0Provider>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}
