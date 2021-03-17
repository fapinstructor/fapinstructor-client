import React from "react";
import DiscordImage from "images/discord.svg";
import Image from "components/atoms/Image";
import Icon from "components/atoms/Icon";

type DiscordIconProps = {
  size: number;
};

export default function DiscordIcon({ size }: DiscordIconProps) {
  return (
    <Icon size={size}>
      <Image alt="Discord" src={DiscordImage} />
    </Icon>
  );
}
