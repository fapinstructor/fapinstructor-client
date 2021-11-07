import TableRow from "@material-ui/core/TableRow";

import ErrorMessage, {
  ErrorMessageProps,
} from "@/components/atoms/ErrorMessage";

import { SpanningTableCell } from "./SpanningTableCell";

export type ErrorTableRowProps = ErrorMessageProps;

export function ErrorTableRow({ message }: ErrorTableRowProps) {
  return (
    <TableRow>
      <SpanningTableCell>
        <ErrorMessage message={message} />
      </SpanningTableCell>
    </TableRow>
  );
}
