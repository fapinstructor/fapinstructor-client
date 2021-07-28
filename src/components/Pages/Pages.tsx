import { lazy } from "react";
import { Switch } from "react-router-dom";
import Route from "components/molecules/Route";
import NavBar from "components/organisms/NavBar";

const ConfigPage = lazy(() => import("components/Pages/ConfigPage"));
const GamePage = lazy(() => import("components/Pages/GamePage"));
const EndPage = lazy(() => import("components/Pages/EndPage"));
const ChangeLog = lazy(() => import("components/Pages/ChangeLog"));
const FaqPage = lazy(() => import("components/Pages/FaqPage"));
const SearchPage = lazy(() => import("components/Pages/SearchPage"));
const ProfilePage = lazy(() => import("components/Pages/ProfilePage"));

const BASE_TITLE = "Fap Instructor";

function getTitle(page: string) {
  return `${page} - ${BASE_TITLE}`;
}

export default function Pages() {
  return (
    <>
      <Switch>
        <Route exact path="/game/:config?" />
        <Route path="/" component={NavBar} />
      </Switch>
      <Switch>
        <Route
          exact
          path="/"
          component={ConfigPage}
          title={getTitle("Config")}
        />
        <Route
          exact
          path="/game/:config?"
          component={GamePage}
          title={getTitle("Game")}
        />
        <Route
          path="/games"
          component={SearchPage}
          title={getTitle("Search")}
        />
        <Route
          exact
          path="/changelog"
          component={ChangeLog}
          title={getTitle("Change Log")}
        />
        <Route exact path="/faq" component={FaqPage} title={getTitle("FAQ")} />
        <Route
          exact
          path="/endgame"
          component={EndPage}
          title={getTitle("End")}
        />
        <Route
          auth
          path="/profile"
          component={ProfilePage}
          title={getTitle("Profile")}
        />
      </Switch>
    </>
  );
}
