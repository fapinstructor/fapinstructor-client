import { Suspense } from "react";
import { Router } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Typography } from "@material-ui/core";
import * as Sentry from "@sentry/react";
import { Provider } from "react-redux";

import Auth0Provider from "@/providers/AuthProvider";
import { NavBar } from "@/components/NavBar";
import NotificationManager from "@/components/NotificationManager";
import configureStore from "@/configureStore";
import history from "@/browserHistory";
import monkey from "@/assets/images/monkey.gif";
import store from "@/stores";
import { Loading } from "@/features/misc";
import { ProxyStoreProvider } from "@/providers/ProxyStoreProvider";
import { queryClient } from "@/lib/react-query";

const engineStore = configureStore();

function FallbackComponent() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center", marginTop: "10vw" }}>
        <Typography color="secondary" variant="h6">
          Something went wrong
        </Typography>
        <Typography color="secondary" variant="subtitle1">
          The error has been logged and we've dispatched the code monkeys
        </Typography>
        <img src={monkey} alt="code monkey" />
      </div>
    </div>
  );
}

type AppProviderProps = {
  children: React.ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  return (
    <Sentry.ErrorBoundary fallback={FallbackComponent}>
      <QueryClientProvider client={queryClient}>
        {process.env.NODE_ENV !== "test" && <ReactQueryDevtools />}
        <Router history={history}>
          <Suspense
            fallback={
              <>
                <NavBar />
                <Loading />
              </>
            }
          >
            <Provider store={store}>
              <NotificationManager />
              <Auth0Provider>
                <ProxyStoreProvider store={engineStore}>
                  <div
                    style={{
                      height: "100vh",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {children}
                  </div>
                </ProxyStoreProvider>
              </Auth0Provider>
            </Provider>
          </Suspense>
        </Router>
      </QueryClientProvider>
    </Sentry.ErrorBoundary>
  );
}
