import React from "react";
import { Switch } from "react-router-dom";
import Route from "components/molecules/Route";
import ConfigPage from "components/Pages/ConfigPage";
import GamePage from "components/Pages/GamePage";
import EndPage from "components/Pages/EndPage";
import ChangeLog from "components/Pages/ChangeLog";
import FaqPage from "components/Pages/FaqPage";
import SearchPage from "components/Pages/SearchPage";
import Profile from "components/Pages/ProfilePage";
import NavBar from "components/organisms/NavBar";

const BASE_TITLE = "Fap Instructor";

function getTitle(page: string) {
  return `${BASE_TITLE} | ${page}`;
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
          component={Profile}
          title={getTitle("Profile")}
        />
      </Switch>
    </>
  );
}
