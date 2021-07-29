import format from "date-fns/format";
import { TableCell, TableCellProps, Typography } from "@material-ui/core";

export type DateColumnProps = TableCellProps & {
  date: string;
};

export default function DateColumn({ date, ...props }: DateColumnProps) {
  return (
    <TableCell {...props}>
      <Typography noWrap>{format(new Date(date), "PP")}</Typography>
    </TableCell>
  );
}
