import * as React from "react";
import {
  AppBar,
  Drawer,
  IconButton,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ProfileButton from "components/molecules/buttons/ProfileButton";
import FapInstructorMenuButton from "components/molecules/buttons/FapInstructorMenuButton";
import DiscordMenuButton from "components/molecules/buttons/DiscordMenuButton";
import PatreonMenuButton from "components/molecules/buttons/PatreonMenuButton";
import ChangeLogMenuButton from "components/molecules/buttons/ChangeLogMenuButton";
import FaqMenuButton from "components/molecules/buttons/FaqMenuButton";
import SearchGameMenuButton from "components/molecules/buttons/SearchGameMenuButton";
import Grow from "components/atoms/Grow";
import ConnectHandy from "components/molecules/ConnectHandy";
import HomeIcon from "@material-ui/icons/Home";
import MenuItem from "components/templates/MenuItem";
import RouteButton from "components/atoms/RouteButton";
import { useHistory } from "react-router-dom";

export default function NavBar() {
  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        <FapInstructorMenuButton />
        <Grow />
        <FullMenu />
        <BurgerMenu />
      </Toolbar>
    </AppBar>
  );
}

const useFullMenuStyles = makeStyles((theme) => ({
  fullMenu: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

function FullMenu() {
  const classes = useFullMenuStyles();

  return (
    <div className={classes.fullMenu}>
      <ConnectHandy />
      <SearchGameMenuButton />
      <DiscordMenuButton />
      <PatreonMenuButton />
      <FaqMenuButton />
      <ChangeLogMenuButton />
      <ProfileButton />
    </div>
  );
}

const useBurgerStyles = makeStyles((theme) => ({
  burgerMenu: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function BurgerMenu() {
  const [open, setOpen] = React.useState(false);
  const classes = useBurgerStyles();
  const history = useHistory();

  React.useEffect(() => {
    history.listen(() => {
      setOpen(false);
    });
  }, [history]);

  return (
    <div className={classes.burgerMenu}>
      <IconButton aria-label="Open menu" onClick={() => setOpen(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <RouteButton to="/">
          <MenuItem icon={<HomeIcon />} title="Home" />
        </RouteButton>
        <SearchGameMenuButton />
        <DiscordMenuButton />
        <PatreonMenuButton />
        <FaqMenuButton />
        <ChangeLogMenuButton />
        <ConnectHandy />
        <ProfileButton />
      </Drawer>
    </div>
  );
}
