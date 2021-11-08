import { PatreonIcon } from "@/components/Icons";
import { AnchorButton } from "@/components/Elements";
import { MenuItem } from "@/components/Templates";

export function PatreonMenuButton() {
  return (
    <AnchorButton href="https://www.patreon.com/bePatron?u=29098019">
      <MenuItem title="Support this site!" icon={<PatreonIcon size={20} />} />
    </AnchorButton>
  );
}
