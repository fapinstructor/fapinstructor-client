import Icon from "components/atoms/Icon";
import Image from "components/atoms/Image";
import PatreonImage from "assets/images/patreon.svg";

type PatreonIconProps = {
  size: number;
};

export default function PatreonIcon({ size }: PatreonIconProps) {
  return (
    <Icon size={size}>
      <Image alt="Patreon" src={PatreonImage} />
    </Icon>
  );
}
