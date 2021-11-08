import HelpIconMUI from "@material-ui/icons/Help";

import { Icon } from "./Icon";

type HelpIconProps = {
  size: number;
};

export function HelpIcon({ size }: HelpIconProps) {
  return (
    <Icon size={size}>
      <HelpIconMUI style={{ color: "black", width: "100%", height: "100%" }} />
    </Icon>
  );
}
