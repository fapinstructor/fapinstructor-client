import { ReactNode } from "react";
import Box from "@material-ui/core/Box";

export type MenuItemProps = {
  icon: ReactNode;
  title: ReactNode;
};

export default function MenuItem({ icon, title }: MenuItemProps) {
  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      gridGap="0.5rem"
      width="100%"
    >
      {icon}
      {title}
    </Box>
  );
}
