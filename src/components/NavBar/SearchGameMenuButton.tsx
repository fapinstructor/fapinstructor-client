import { SearchIcon } from "@/components/Icons";
import { RouteButton } from "@/components/Elements";
import { MenuItem } from "@/components/Templates";

export function SearchGameMenuButton() {
  return (
    <RouteButton to="/games/search">
      <MenuItem title="Games" icon={<SearchIcon size={25} />} />
    </RouteButton>
  );
}
