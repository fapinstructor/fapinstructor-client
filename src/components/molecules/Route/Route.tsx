import React, { useEffect } from "react";
import { Route, RouteProps } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

type Props = RouteProps & {
  title?: string;
  auth?: boolean;
};

export default function RouteWrapper({
  title,
  auth,
  location,
  ...props
}: Props) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  return auth ? <PrivateRoute {...props} /> : <Route {...props} />;
}
