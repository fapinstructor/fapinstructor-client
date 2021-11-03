/**
 * TODO: Refactor the routes to use a config instead of React Elements.  This will
 * give the ability to create more dynamic routes in the future.
 * https://reactrouter.com/web/example/route-config
 */

import { lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { useAuth0 } from "AuthProvider";
import NavBar from "components/organisms/NavBar";

const ConfigPage = lazy(() => import("components/Pages/ConfigPage"));
const GamePage = lazy(() => import("components/Pages/GamePage"));
const EndPage = lazy(() => import("components/Pages/EndPage"));
const ChangeLog = lazy(() => import("components/Pages/ChangeLog"));
const PrivacyPolicy = lazy(() => import("components/Pages/PrivacyPolicy"));
const FaqPage = lazy(() => import("components/Pages/FaqPage"));
const SearchPage = lazy(() => import("components/Pages/SearchPage"));
const ProfilePage = lazy(() => import("components/Pages/ProfilePage"));

export function AppRoutes() {
  const auth = useAuth0();

  // const publicRoutes = [];
  const protectedRoutes = [<Route path="/profile" component={ProfilePage} />];
  const commonRoutes = [
    <Route path="/games" component={SearchPage} />,
    <Route exact path="/game/:config?" component={GamePage} />,
    <Route exact path="/changelog" component={ChangeLog} />,
    <Route exact path="/privacy" component={PrivacyPolicy} />,
    <Route exact path="/faq" component={FaqPage} />,
    <Route exact path="/endgame" component={EndPage} />,
    <Route exact path="/" component={ConfigPage} />,
  ];

  return (
    <>
      <Switch>
        <Route exact path="/game/:config?" />
        <Route path="/" component={NavBar} />
      </Switch>
      <Switch>
        {auth.user && protectedRoutes}
        {commonRoutes}
        <Redirect to="/" />
      </Switch>
    </>
  );
}
