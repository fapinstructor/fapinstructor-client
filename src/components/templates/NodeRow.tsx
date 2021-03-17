import React, { ReactNode, ReactNodeArray } from "react";
import Box from "@material-ui/core/Box";

export type NodeRowProps = {
  children: ReactNodeArray;
};

export default function NodeRow({ children }: NodeRowProps) {
  return (
    <Box display="flex">
      {children.map((button: ReactNode, index: number) => (
        <Box key={index} mr={index + 1 < children.length ? 1 : 0}>
          {button}
        </Box>
      ))}
    </Box>
  );
}
