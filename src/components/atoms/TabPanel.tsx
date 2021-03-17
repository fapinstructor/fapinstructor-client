import React, { ReactNode } from "react";
import { Box } from "@material-ui/core";

type TabPanelProps = {
  children: ReactNode;
  index: number;
  value: number;
};

export default function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}
