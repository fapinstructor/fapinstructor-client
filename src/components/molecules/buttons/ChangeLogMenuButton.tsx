import ChangeLogIcon from "components/molecules/icons/ChangeLogIcon";
import RouteButton from "components/atoms/RouteButton";
import MenuItem from "components/templates/MenuItem";

export default function ChangeLogMenuButton() {
  return (
    <RouteButton to="/changelog">
      <MenuItem title="Change Log" icon={<ChangeLogIcon size={25} />} />
    </RouteButton>
  );
}
