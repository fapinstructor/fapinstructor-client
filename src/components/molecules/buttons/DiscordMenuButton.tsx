import React from "react";
import DiscordIcon from "components/molecules/icons/DiscordIcon";
import AnchorButton from "components/atoms/AnchorButton";
import MenuItem from "components/templates/MenuItem";

export default function DiscordMenuButton() {
  return (
    <AnchorButton href="https://discord.gg/2CJPr9M">
      <MenuItem title="Join us on Discord" icon={<DiscordIcon size={25} />} />
    </AnchorButton>
  );
}
