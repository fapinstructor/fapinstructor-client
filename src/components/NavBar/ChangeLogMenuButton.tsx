import { ChangeLogIcon } from "@/components/Icons";
import { RouteButton } from "@/components/Elements";
import { MenuItem } from "@/components/Templates";

export function ChangeLogMenuButton() {
  return (
    <RouteButton to="/changelog">
      <MenuItem title="Change Log" icon={<ChangeLogIcon size={25} />} />
    </RouteButton>
  );
}
