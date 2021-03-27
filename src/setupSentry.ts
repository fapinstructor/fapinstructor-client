import * as Sentry from "@sentry/react";

if (
  process.env.NODE_ENV === "production" &&
  process.env.REACT_APP_SENTRY_RELEASE
) {
  Sentry.init({
    denyUrls: [/translate\.googleusercontent\.com/i],
    dsn: process.env.REACT_APP_SENTRY_DSN,
    release: process.env.REACT_APP_SENTRY_RELEASE,
    environment: process.env.NODE_ENV,
  });
}
