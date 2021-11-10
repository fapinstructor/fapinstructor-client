import { useMutation } from "react-query";

import { axios } from "@/lib/axios";
import { GameConfig } from "@/configureStore";

type CreateGameResponse = {
  id: string;
};

export type CreateGameDTO = {
  title: string;
  tags: string[];
  isPublic: boolean;
  config: GameConfig;
};

export function createGame(game: CreateGameDTO): Promise<CreateGameResponse> {
  return axios.post("/v1/games", game);
}

export function useCreateGame() {
  return useMutation((game: CreateGameDTO) => createGame(game));
}
