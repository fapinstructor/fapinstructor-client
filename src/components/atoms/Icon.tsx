import { ReactNode } from "react";
import Box from "@material-ui/core/Box";

export type IconProps = {
  children: ReactNode;
  size: number;
};

export default function Icon({ size, children }: IconProps) {
  return (
    <Box width={size} height={size}>
      {children}
    </Box>
  );
}
