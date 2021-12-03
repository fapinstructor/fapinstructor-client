import * as React from "react";
import {
  Table,
  TableHead,
  TableFooter,
  TableRow,
  TableCell,
  TablePagination,
  TextField,
  Typography,
  TableSortLabel,
} from "@material-ui/core";

import {
  AsyncTableBody,
  DateColumn,
  RouteColumn,
  TagsColumn,
  StarsColumn,
  SpanningTableCell,
} from "@/components/Elements";
import { GameRecord } from "@/types/GameRecord";
import { PaginateQuery } from "@/types/Pagination";
import { TagsField } from "@/features/tags";

import { SearchGamesFilters, useSearchGames } from "../api/searchGames";

export type GamesTableProps = {
  createdBy?: string;
  playedBy?: string;
  starredBy?: string;
};

type SortDirection = "asc" | "desc" | undefined;

export default function GamesTable({
  createdBy,
  playedBy,
  starredBy,
}: GamesTableProps) {
  const [paginate, setPaginate] = React.useState<PaginateQuery>({
    perPage: 10,
    currentPage: 1,
  });

  const [filters, setFilters] = React.useState<SearchGamesFilters>({
    title: "",
    tags: [],
  });

  const [sort, setSort] = React.useState<{
    [key: string]: SortDirection;
  }>({});

  const searchGamesQuery = useSearchGames({
    createdBy,
    playedBy,
    starredBy,
    ...filters,
    ...paginate,
    sort: Object.entries(sort).map(([key, direction]) =>
      direction === "asc" ? key : `-${key}`
    ),
  });

  const handlePageChange = (_event: unknown, page: number) => {
    setPaginate({
      ...paginate,
      currentPage: page + 1,
    });
  };

  const handleRowsPerPageChange = (
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

  function changeDirection(columnId: string) {
    const currentDirection = sort[columnId];

    let direction: SortDirection = undefined;
    switch (currentDirection) {
      case "asc":
        direction = "desc";
        break;
      case "desc": {
        direction = undefined;
        break;
      }
      case undefined: {
        direction = "asc";
        break;
      }
    }

    const newSort = { ...sort };

    if (direction === undefined) {
      delete newSort[columnId];
    } else {
      newSort[columnId] = direction;
    }

    setSort(newSort);
  }

  return (
    <Table aria-label="Games">
      <TableHead>
        <TableRow>
          <TableCell sortDirection={sort["stars"]}>
            <TableSortLabel
              active={!!sort["stars"]}
              direction={sort["stars"]}
              onClick={() => changeDirection("stars")}
            >
              Stars
            </TableSortLabel>
          </TableCell>
          <TableCell style={{ width: "50%" }} sortDirection={sort["title"]}>
            <TableSortLabel
              active={!!sort["title"]}
              direction={sort["title"]}
              onClick={() => changeDirection("title")}
            >
              Title
            </TableSortLabel>
          </TableCell>
          <TableCell sortDirection={sort["averageGameDuration"]}>
            <TableSortLabel
              active={!!sort["averageGameDuration"]}
              direction={sort["averageGameDuration"]}
              onClick={() => changeDirection("averageGameDuration")}
            >
              Average Game Duration
            </TableSortLabel>
          </TableCell>
          <TableCell>Tags</TableCell>
          <TableCell align="right" sortDirection={sort["updatedAt"]}>
            <TableSortLabel
              active={!!sort["updatedAt"]}
              direction={sort["updatedAt"]}
              onClick={() => changeDirection("updatedAt")}
            >
              Created On
            </TableSortLabel>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell />
          <TableCell>
            <TextField
              placeholder="Filter by title"
              value={filters.title}
              fullWidth
              inputProps={{
                maxLength: 50,
              }}
              onChange={handleTitleChange}
            />
          </TableCell>
          <TableCell />
          <SpanningTableCell>
            <TagsField value={filters.tags} onChange={handleTagsChange} />
          </SpanningTableCell>
        </TableRow>
      </TableHead>
      <AsyncTableBody
        loading={searchGamesQuery.isLoading}
        error={searchGamesQuery.error as string}
      >
        {searchGamesQuery.data?.data?.map(
          ({
            id,
            title,
            tags,
            stars,
            starred,
            updatedAt,
            averageGameDuration,
          }: GameRecord) => (
            <TableRow key={id}>
              <StarsColumn gameId={id} stars={stars} starred={starred} />
              <RouteColumn title={title} to={`/game/${id}`} />
              <TableCell>
                <Typography>{averageGameDuration}</Typography>
              </TableCell>
              <TagsColumn tags={tags} />
              <DateColumn date={updatedAt} align="right" />
            </TableRow>
          )
        )}
      </AsyncTableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            count={searchGamesQuery.data?.pagination.total || 0}
            rowsPerPage={paginate.perPage}
            page={paginate.currentPage - 1}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </TableRow>
      </TableFooter>
    </Table>
  );
}
