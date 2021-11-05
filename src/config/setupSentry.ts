import * as Sentry from "@sentry/react";
import { Integrations as TracingIntegrations } from "@sentry/tracing";

if (
  process.env.NODE_ENV === "production" &&
  process.env.REACT_APP_SENTRY_RELEASE
) {
  Sentry.init({
    denyUrls: [/translate\.googleusercontent\.com/i, /jerkofftocelebs\.com/i],
    integrations: [new TracingIntegrations.BrowserTracing()],
    tracesSampleRate: 0.2,
    // TODO: Convert sample rate to env var if decided this feature is greenlighted.
    // tracesSampleRate: Number(process.env.REACT_APP_SENTRY_TRACE_SAMPLE_RATE),
    dsn: process.env.REACT_APP_SENTRY_DSN,
    release: process.env.REACT_APP_SENTRY_RELEASE,
    environment: process.env.NODE_ENV,
  });
}
