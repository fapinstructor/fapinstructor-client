import HelpIcon from "@/components/molecules/icons/HelpIcon";
import RouteButton from "@/components/atoms/RouteButton";
import MenuItem from "@/components/templates/MenuItem";

export default function FaqMenuButton() {
  return (
    <RouteButton to="/faq">
      <MenuItem title="FAQ" icon={<HelpIcon size={25} />} />
    </RouteButton>
  );
}
