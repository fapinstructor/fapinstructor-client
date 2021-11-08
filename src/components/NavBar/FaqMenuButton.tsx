import { HelpIcon } from "@/components/Icons";
import { RouteButton } from "@/components/Elements";
import { MenuItem } from "@/components/Templates";

export function FaqMenuButton() {
  return (
    <RouteButton to="/faq">
      <MenuItem title="FAQ" icon={<HelpIcon size={25} />} />
    </RouteButton>
  );
}
