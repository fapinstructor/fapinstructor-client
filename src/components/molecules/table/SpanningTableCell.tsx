import React, { ReactNode } from "react";
import { TableCell } from "@material-ui/core";

type SpanningTableCellProps = {
  children: ReactNode;
};

export default function SpanningTableCell({
  children,
}: SpanningTableCellProps) {
  return <TableCell colSpan={100}>{children}</TableCell>;
}
