import React from "react";
import { Route, Switch } from "react-router-dom";
import ConfigPage from "components/Pages/ConfigPage";
import GamePage from "components/Pages/GamePage";
import EndPage from "components/Pages/EndPage";
import ChangeLog from "components/Pages/ChangeLog";
import FaqPage from "components/Pages/FaqPage";
import SearchPage from "components/Pages/SearchPage";
import Profile from "components/Pages/ProfilePage";
import PrivateRoute from "components/PrivateRoute";
import NavBar from "components/organisms/NavBar";

export default function Pages() {
  return (
    <>
      <Switch>
        <Route exact path="/game/:config?" />
        <Route path="/" component={NavBar} />
      </Switch>
      <Switch>
        <Route exact path="/" component={ConfigPage} />
        <Route exact path="/game/:config?" component={GamePage} />
        <Route path="/games" component={SearchPage} />
        <Route exact path="/changelog" component={ChangeLog} />
        <Route exact path="/faq" component={FaqPage} />
        <Route exact path="/endgame" component={EndPage} />
        <PrivateRoute path="/profile" component={Profile} />
      </Switch>
    </>
  );
}
