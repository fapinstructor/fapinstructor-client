import * as Sentry from "@sentry/react";

export default function captureError(error: Error) {
  Sentry.captureException(error);
  console.error(error);
}
