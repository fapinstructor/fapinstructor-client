import { Game } from "@/types/Game";
import { GameConfig } from "@/configureStore";
import { PaginateParams, WithPagination } from "@/common/types/pagination";

export interface CreateGameRequest {
  title: string;
  tags: string[];
  isPublic: boolean;
  config: GameConfig;
}

export interface CreateGameResponse {
  id: string;
}

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

export type SearchGamesResponse = WithPagination<Game[]>;
