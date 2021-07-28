import { TableRow, LinearProgress } from "@material-ui/core";
import SpanningTableCell from "components/molecules/table/SpanningTableCell";

export default function LoadingTableRow() {
  return (
    <TableRow>
      <SpanningTableCell>
        <LinearProgress />
      </SpanningTableCell>
    </TableRow>
  );
}
