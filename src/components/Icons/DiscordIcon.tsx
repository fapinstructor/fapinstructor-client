import DiscordImage from "@/assets/images/discord.svg";
import Image from "@/components/atoms/Image";

import { Icon } from "./Icon";

type DiscordIconProps = {
  size: number;
};

export function DiscordIcon({ size }: DiscordIconProps) {
  return (
    <Icon size={size}>
      <Image alt="Discord" src={DiscordImage} />
    </Icon>
  );
}
