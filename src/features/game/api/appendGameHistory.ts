import { useMutation } from "react-query";

import { axios } from "@/lib/axios";

export type AppendGameDTO = {
  gameId: string;
  userId: string;
};

export function appendGameHistory(appendGame: AppendGameDTO) {
  return axios.put(
    `/v1/users/${appendGame.userId}/games/history/${appendGame.gameId}`
  );
}

export function useAppendGameHistory() {
  return useMutation((appendGame: AppendGameDTO) =>
    appendGameHistory(appendGame)
  );
}
