import { TableRow, LinearProgress } from "@material-ui/core";

import { SpanningTableCell } from "./SpanningTableCell";

export function LoadingTableRow() {
  return (
    <TableRow>
      <SpanningTableCell>
        <LinearProgress />
      </SpanningTableCell>
    </TableRow>
  );
}
