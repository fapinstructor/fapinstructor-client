import { Link as RouterLink } from "react-router-dom";
import { TableCell, Link, TableCellProps, Typography } from "@material-ui/core";

export type RouteColumnProps = TableCellProps & {
  to: string;
  title: string;
};

export default function RouteColumn({ to, title, ...props }: RouteColumnProps) {
  return (
    <TableCell {...props} component="th" scope="row">
      <Link component={RouterLink} to={to}>
        <Typography noWrap>{title}</Typography>
      </Link>
    </TableCell>
  );
}
