import { ReactNode } from "react";
import Box from "@material-ui/core/Box";

export type MenuItemProps = {
  icon: ReactNode;
  title: ReactNode;
  smallTitle?: ReactNode;
};

export default function MenuItem({ icon, title, smallTitle }: MenuItemProps) {
  return (
    <Box display="flex" alignItems="center">
      {icon}
      <Box display={{ xs: "none", md: "block" }} ml={1} whiteSpace="noWrap">
        {title}
      </Box>
      <Box display={{ sm: "block", md: "none" }} ml={1}>
        {smallTitle}
      </Box>
    </Box>
  );
}
