import React from "react";
import SearchIcon from "components/molecules/icons/SearchIcon";
import RouteButton from "components/atoms/RouteButton";
import MenuItem from "components/templates/MenuItem";

export default function ChangeLogMenuButton() {
  return (
    <RouteButton to="/games/search">
      <MenuItem title="Games" icon={<SearchIcon size={25} />} />
    </RouteButton>
  );
}
