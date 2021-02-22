import React from "react";
import Icon, { IconProps } from "components/atoms/Icon";
import HelpIconMUI from "@material-ui/icons/Help";

export default function HelpIcon({ size }: IconProps) {
  return (
    <Icon size={size}>
      <HelpIconMUI style={{ color: "black", width: "100%", height: "100%" }} />
    </Icon>
  );
}
