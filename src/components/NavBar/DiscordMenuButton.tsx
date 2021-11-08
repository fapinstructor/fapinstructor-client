import { DiscordIcon } from "@/components/Icons";
import AnchorButton from "@/components/atoms/AnchorButton";
import { MenuItem } from "@/components/Templates";

export function DiscordMenuButton() {
  return (
    <AnchorButton href="https://discord.gg/2CJPr9M">
      <MenuItem title="Join us on Discord" icon={<DiscordIcon size={25} />} />
    </AnchorButton>
  );
}
