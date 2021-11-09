
import PatreonImage from "@/assets/images/patreon.svg";
import { Image } from "@/components/Elements";

import { Icon } from "./Icon";


type PatreonIconProps = {
  size: number;
};

export function PatreonIcon({ size }: PatreonIconProps) {
  return (
    <Icon size={size}>
      <Image alt="Patreon" src={PatreonImage} />
    </Icon>
  );
}
