import * as yup from "yup";
import { isAlpha } from "utils/regex";
import { PaginateParams, WithPagination } from "common/types/pagination";
import { Game } from "api/types";
import { GameConfig } from "configureStore";

export const CREATE_GAME_SCHEMA = yup.object().shape({
  title: yup
    .string()
    .min(5, "The title must contain at least 5 characters.")
    .max(50, "The title cannot be greater than 50 characters long.")
    .required("Please enter a title."),
  tags: yup
    .array()
    .of(
      yup
        .string()
        .matches(isAlpha, "Only lowercase letters and spaces are permitted.")
        .min(3, "A tag must be at least 3 characters long.")
        .max(30, "A tag cannot be greater than 30 characters long.")
        .required()
    )
    .min(1, "You must specify at least 1 tag."),
  isPublic: yup.boolean().required(),
  config: yup.object().required(),
});

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
