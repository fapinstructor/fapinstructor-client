import { ReactNode } from "react";
import TableBody from "@material-ui/core/TableBody";

import { LoadingTableRow } from "./LoadingTableRow";
import { ErrorTableRow } from "./ErrorTableRow";

export type AsyncTableBodyProps = {
  children: ReactNode;
  loading: boolean;
  error?: string;
};

export function AsyncTableBody({
  children,
  loading,
  error,
}: AsyncTableBodyProps) {
  return (
    <TableBody>
      {loading && <LoadingTableRow />}
      {error && <ErrorTableRow message={error} />}
      {children}
    </TableBody>
  );
}
