import { useState, useEffect } from "react";
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
import AsyncTableBody from "components/molecules/table/AsyncTableBody";
import DateColumn from "components/molecules/table/DateColumn";
import RouteColumn from "components/molecules/table/RouteColumn";
import TagsColumn from "components/molecules/table/TagsColumn";
import StarsColumn from "components/molecules/table/StarsColumn";
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
  starredBy?: string;
  searchGames: (request: SearchGamesRequest) => void;
  games: Game[];
  pagination: Pagination;
  loading: boolean;
  error?: string;
};

type SortDirection = "asc" | "desc" | undefined;

export default function GamesTable({
  createdBy,
  playedBy,
  starredBy,
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

  const [sort, setSort] = useState<{
    [key: string]: SortDirection;
  }>({});

  useEffect(() => {
    const req: SearchGamesRequest = {
      createdBy,
      playedBy,
      starredBy,
      ...filters,
      ...paginate,
      sort: Object.entries(sort).map(([key, direction]) =>
        direction === "asc" ? key : `-${key}`
      ),
    };
    searchGames(req);
  }, [searchGames, filters, sort, createdBy, playedBy, starredBy, paginate]);

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

    setSort({ ...sort, [columnId]: direction });
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
          <TableCell sortDirection={sort["averageGameLength"]}>
            <TableSortLabel
              active={!!sort["averageGameLength"]}
              direction={sort["averageGameLength"]}
              onClick={() => changeDirection("averageGameLength")}
            >
              Average Game Length
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
              onChange={handleTitleChange}
            />
          </TableCell>
          <TableCell />
          <SpanningTableCell>
            <TagsField value={filters.tags} onChange={handleTagsChange} />
          </SpanningTableCell>
        </TableRow>
      </TableHead>
      <AsyncTableBody loading={loading} error={error}>
        {games?.map(
          ({
            id,
            title,
            tags,
            stars,
            starred,
            updatedAt,
            averageGameLength,
          }: Game) => (
            <TableRow key={id}>
              <StarsColumn gameId={id} stars={stars} starred={starred} />
              <RouteColumn title={title} to={`/game/${id}`} />
              <TableCell>
                <Typography>{averageGameLength}</Typography>
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
            count={pagination && pagination.total}
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
