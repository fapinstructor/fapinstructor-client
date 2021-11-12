import { GameRecord } from "@/types/GameRecord";
import { PaginateParams, WithPagination } from "@/common/types/pagination";

export interface SearchGamesParams {
  title?: string;
  tags?: string[];
  sort?: string[];
  createdBy?: string;
  playedBy?: string;
  starredBy?: string;
}

export interface SearchGamesRequest extends SearchGamesParams, PaginateParams {
  sort?: string[];
}

export type SearchGamesResponse = WithPagination<GameRecord[]>;
