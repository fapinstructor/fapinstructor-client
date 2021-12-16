import * as Sentry from "@sentry/react";
import { Integrations as TracingIntegrations } from "@sentry/tracing";

if (
  process.env.NODE_ENV === "production" &&
  process.env.REACT_APP_SENTRY_RELEASE
) {
  Sentry.init({
    allowUrls: [/https?:\/\/(www\.)?fapinstructor\.com/],
    integrations: [new TracingIntegrations.BrowserTracing()],
    tracesSampleRate: 0.1,
    dsn: process.env.REACT_APP_SENTRY_DSN,
    release: process.env.REACT_APP_SENTRY_RELEASE,
    environment: process.env.NODE_ENV,
  });
}
