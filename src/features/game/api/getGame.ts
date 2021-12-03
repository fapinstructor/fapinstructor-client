import { useQuery } from "react-query";

import { axios } from "@/lib/axios";

import { Game } from "../types/Game";

export function getGame({ gameId }: { gameId: string }): Promise<Game> {
  return axios.get(`/v1/games/${gameId}`);
}

type UseGameConfig = {
  gameId?: string;
};

export function useGame({ gameId }: UseGameConfig) {
  return useQuery(
    ["game", gameId],
    () => {
      if (!gameId) return;
      return getGame({ gameId });
    },
    {
      staleTime: Infinity,
      enabled: !!gameId,
    }
  );
}
