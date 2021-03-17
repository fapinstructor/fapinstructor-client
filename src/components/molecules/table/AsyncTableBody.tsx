import React, { ReactNode } from "react";
import TableBody from "@material-ui/core/TableBody";
import LoadingTableRow from "components/molecules/table/LoadingTableRow";
import ErrorTableRow from "components/molecules/table/ErrorTableRow";

export type AsyncTableBodyProps = {
  children: ReactNode;
  loading: boolean;
  error?: string;
};

export default function AsyncTableBody({
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
