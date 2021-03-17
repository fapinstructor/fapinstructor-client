import React, { useEffect } from "react";
import { Route, RouteProps } from "react-router-dom";
import { useAuth0 } from "AuthProvider";
import UnauthorizedPage from "components/Pages/UnauthorizedPage";
import LoadingPage from "components/Pages/LoadingPage";

export default function PrivateRoute({
  component,
  path,
  location,
  ...props
}: RouteProps) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    const fn = async () => {
      if (!isAuthenticated && !isLoading) {
        await loginWithRedirect({
          appState: { returnTo: location?.pathname },
        });
      }
    };
    fn();
  }, [isAuthenticated, isLoading, loginWithRedirect, location]);

  return (
    <Route
      {...props}
      path={path}
      component={
        isAuthenticated ? component : isLoading ? LoadingPage : UnauthorizedPage
      }
    />
  );
}
