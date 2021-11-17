import { useQuery } from "react-query";
import * as qs from "query-string";

import { axios } from "@/lib/axios";
import { PaginateQuery, WithPagination } from "@/types/Pagination";
import { GameRecord } from "@/types/GameRecord";
import { useDebounce } from "@/hooks/useDebounce";

export type SearchGamesFilters = {
  title?: string;
  tags?: string[];
  sort?: string[];
  createdBy?: string;
  playedBy?: string;
  starredBy?: string;
};

type SearchGamesQuery = SearchGamesFilters & PaginateQuery;
type SearchGamesResult = WithPagination<GameRecord[]>;

function searchGames(query: SearchGamesQuery): Promise<SearchGamesResult> {
  let url;
  const queryString = qs.stringify(query, {
    arrayFormat: "comma",
  });

  if (query.playedBy) {
    url = `/v1/users/${query.playedBy}/games/history?${queryString}`;
  } else if (query.starredBy) {
    url = `/v1/users/${query.starredBy}/games/starred?${queryString}`;
  } else {
    url = `/v1/games?${queryString}`;
  }

  return axios.get(url);
}

export function useSearchGames(query: SearchGamesQuery) {
  const debouncedSearchQuery = useDebounce(query);

  return useQuery(["games", debouncedSearchQuery], () =>
    searchGames(debouncedSearchQuery)
  );
}
