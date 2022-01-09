import * as React from "react";
import {
  AppBar,
  Drawer,
  IconButton,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";

import history from "@/browserHistory";
import { RouteButton } from "@/components/Elements";
import { ConnectHandy } from "@/features/handy";
import { Grow, MenuItem } from "@/components/Templates";
import { FileSystemSelector } from "@/features/file-system";

import { ProfileButton } from "./ProfileButton";
import { FapInstructorMenuButton } from "./FapInstructorMenuButton";
import { DiscordMenuButton } from "./DiscordMenuButton";
import { PatreonMenuButton } from "./PatreonMenuButton";
import { ChangeLogMenuButton } from "./ChangeLogMenuButton";
import { FaqMenuButton } from "./FaqMenuButton";
import { SearchGameMenuButton } from "./SearchGameMenuButton";

export function NavBar() {
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
      <FileSystemSelector />
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

  React.useEffect(() => {
    history.listen(() => {
      setOpen(false);
    });
  }, []);

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
        <FileSystemSelector />
        <ProfileButton />
      </Drawer>
    </div>
  );
}
