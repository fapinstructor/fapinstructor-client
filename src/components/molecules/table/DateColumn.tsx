import moment from "moment";
import { TableCell, TableCellProps, Typography } from "@material-ui/core";

export type DateColumnProps = TableCellProps & {
  date: Date;
  format: string;
};

export default function DateColumn({
  date,
  format,
  ...props
}: DateColumnProps) {
  return (
    <TableCell {...props}>
      <Typography noWrap>{moment(date).format(format)}</Typography>
    </TableCell>
  );
}
