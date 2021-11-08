import TableRow from "@material-ui/core/TableRow";
import { Typography } from "@material-ui/core";

import { SpanningTableCell } from "./SpanningTableCell";

export type ErrorTableRowProps = {
  message: string;
};

export function ErrorTableRow({ message }: ErrorTableRowProps) {
  return (
    <TableRow>
      <SpanningTableCell>
        <Typography variant="subtitle2" color="secondary">
          {message}
        </Typography>
      </SpanningTableCell>
    </TableRow>
  );
}
