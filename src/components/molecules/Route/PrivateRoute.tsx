import React, { useEffect } from "react";
import { Route, RouteProps } from "react-router-dom";
import { useAuth0 } from "AuthProvider";
import UnauthorizedPage from "components/Pages/UnauthorizedPage";
import LoadingPage from "components/Pages/LoadingPage";

const PrivateRoute = ({ component, path, location, ...rest }: RouteProps) => {
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
      {...rest}
      path={path}
      component={
        isAuthenticated ? component : isLoading ? LoadingPage : UnauthorizedPage
      }
    />
  );
};

export default PrivateRoute;
