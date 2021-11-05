/**
 * TODO: Refactor the routes to use a config instead of React Elements.  This will
 * give the ability to create more dynamic routes in the future.
 * https://reactrouter.com/web/example/route-config
 */
import { Redirect, Route, Switch } from "react-router-dom";

import { useAuth0 } from "@/providers/AuthProvider";
import NavBar from "@/components/organisms/NavBar";
import { lazyImport } from "@/utils/lazyImport";

// prettier-ignore
const { GameConfig } = lazyImport(() => import("@/features/game-config"), "GameConfig");
const { Game } = lazyImport(() => import("@/features/game"), "Game");
const { End } = lazyImport(() => import("@/features/end"), "End");
// prettier-ignore
const { ChangeLog } = lazyImport(() => import("@/features/changelog"), "ChangeLog");
// prettier-ignore
const { PrivacyPolicy } = lazyImport(() => import("@/features/privacy-policy"), "PrivacyPolicy");
const { Faq } = lazyImport(() => import("@/features/faq"), "Faq");
const { Search } = lazyImport(() => import("@/features/search"), "Search");
const { Profile } = lazyImport(() => import("@/features/profile"), "Profile");

export function AppRoutes() {
  const auth = useAuth0();

  // const publicRoutes = [];
  const protectedRoutes = [<Route path="/profile" component={Profile} />];
  const commonRoutes = [
    <Route path="/games" component={Search} />,
    <Route exact path="/game/:config?" component={Game} />,
    <Route exact path="/changelog" component={ChangeLog} />,
    <Route exact path="/privacy" component={PrivacyPolicy} />,
    <Route exact path="/faq" component={Faq} />,
    <Route exact path="/endgame" component={End} />,
    <Route exact path="/" component={GameConfig} />,
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
