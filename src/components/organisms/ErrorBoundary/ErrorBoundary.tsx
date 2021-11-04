import * as Sentry from "@sentry/react";
import { Typography } from "@material-ui/core";
import monkey from "@/assets/images/monkey.gif";
import store from "@/store";

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

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

export default function ErrorBoundary({ children }: ErrorBoundaryProps) {
  return (
    <Sentry.ErrorBoundary
      beforeCapture={(scope) => {
        scope.setExtra("store", JSON.stringify(store));
      }}
      fallback={FallbackComponent}
    >
      {children}
    </Sentry.ErrorBoundary>
  );
}
