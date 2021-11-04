import TableRow from "@material-ui/core/TableRow";
import SpanningTableCell from "@/components/molecules/table/SpanningTableCell";
import ErrorMessage, {
  ErrorMessageProps,
} from "@/components/atoms/ErrorMessage";

export type ErrorTableRowProps = ErrorMessageProps;

export default function ErrorTableRow({ message }: ErrorTableRowProps) {
  return (
    <TableRow>
      <SpanningTableCell>
        <ErrorMessage message={message} />
      </SpanningTableCell>
    </TableRow>
  );
}
