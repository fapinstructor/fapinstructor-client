import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ProfileButton from "components/molecules/buttons/ProfileButton";
import FapInstructorMenuButton from "components/molecules/buttons/FapInstructorMenuButton";
import DiscordMenuButton from "components/molecules/buttons/DiscordMenuButton";
import PatreonMenuButton from "components/molecules/buttons/PatreonMenuButton";
import ChangeLogMenuButton from "components/molecules/buttons/ChangeLogMenuButton";
import FaqMenuButton from "components/molecules/buttons/FaqMenuButton";
import SearchGameMenuButton from "components/molecules/buttons/SearchGameMenuButton";
import Grow from "components/atoms/Grow";
import ConnectHandy from "components/molecules/ConnectHandy";

export default function NavBar() {
  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        <FapInstructorMenuButton />
        <Grow />
        <ConnectHandy />
        <SearchGameMenuButton />
        <DiscordMenuButton />
        <PatreonMenuButton />
        <FaqMenuButton />
        <ChangeLogMenuButton />
        <ProfileButton />
      </Toolbar>
    </AppBar>
  );
}
