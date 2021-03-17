import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableFooter,
  TableRow,
  TableCell,
  TablePagination,
  TextField,
} from "@material-ui/core";
import AsyncTableBody from "components/molecules/table/AsyncTableBody";
import DateColumn from "components/molecules/table/DateColumn";
import RouteColumn from "components/molecules/table/RouteColumn";
import TagsColumn from "components/molecules/table/TagsColumn";
import SpanningTableCell from "components/molecules/table/SpanningTableCell";
import { Game } from "api/types";
import TagsField from "components/molecules/TagsField";
import {
  SearchGamesRequest,
  SearchGamesParams,
} from "common/api/schemas/games";
import { PaginateParams, Pagination } from "common/types/pagination";

export type GamesTableProps = {
  createdBy?: string;
  playedBy?: string;
  searchGames: (request: SearchGamesRequest) => void;
  games: Game[];
  pagination: Pagination;
  loading: boolean;
  error?: string;
};

export default function GamesTable({
  createdBy,
  playedBy,
  searchGames,
  games,
  pagination,
  loading,
  error,
}: GamesTableProps) {
  const [paginate, setPaginate] = useState<PaginateParams>({
    perPage: 10,
    currentPage: 1,
  });

  const [filters, setFilters] = useState<SearchGamesParams>({
    title: "",
    tags: [],
  });

  useEffect(() => {
    const req: SearchGamesRequest = {
      createdBy,
      playedBy,
      ...filters,
      ...paginate,
    };
    searchGames(req);
  }, [searchGames, filters, createdBy, playedBy, paginate]);

  const handleChangePage = (_event: unknown, page: number) => {
    setPaginate({
      ...paginate,
      currentPage: page + 1,
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const perPage = Number(event.target.value);

    setPaginate({
      ...paginate,
      perPage,
    });
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      title: event.target.value,
    });
    setPaginate({
      ...paginate,
      currentPage: 1,
    });
  };

  const handleTagsChange = (tags: string[]) => {
    setFilters({
      ...filters,
      tags,
    });
    setPaginate({
      ...paginate,
      currentPage: 1,
    });
  };

  return (
    <Table aria-label="Games">
      <TableHead>
        <TableRow>
          <TableCell style={{ width: "100%" }}>Title</TableCell>
          <TableCell>Tags</TableCell>
          <TableCell align="right">Created At</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <TextField
              placeholder="Filter by title"
              value={filters.title}
              fullWidth
              onChange={handleTitleChange}
            />
          </TableCell>
          <SpanningTableCell>
            <TagsField value={filters.tags} onChange={handleTagsChange} />
          </SpanningTableCell>
        </TableRow>
      </TableHead>
      <AsyncTableBody loading={loading} error={error}>
        {games?.map(({ id, title, tags, updatedAt }: Game) => (
          <TableRow key={id}>
            <RouteColumn title={title} to={`/game/${id}`} />
            <TagsColumn tags={tags} />
            <DateColumn date={updatedAt} format="LLL" align="right" />
          </TableRow>
        ))}
      </AsyncTableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            count={pagination && pagination.total}
            rowsPerPage={paginate.perPage}
            page={paginate.currentPage - 1}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </TableRow>
      </TableFooter>
    </Table>
  );
}
