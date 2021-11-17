import { useMutation } from "react-query";

import { queryClient } from "@/lib/react-query";
import { axios } from "@/lib/axios";

import { Game } from "../types/Game";

type UseStarOptions = {
  profileId: string;
  gameId: string;
};

export function deleteStar({ profileId, gameId }: UseStarOptions) {
  return axios.delete(`/v1/users/${profileId}/games/star/${gameId}`);
}

export function addStar({ profileId, gameId }: UseStarOptions) {
  return axios.post(`/v1/users/${profileId}/games/star/${gameId}`);
}

export function useDeleteStar() {
  return useMutation({
    mutationFn: deleteStar,
    async onMutate(options) {
      await queryClient.cancelQueries("game");
      // TODO: Add optimistic update for games table

      const previousGame = queryClient.getQueryData<Game>([
        "game",
        options.gameId,
      ]);

      if (!previousGame) {
        return;
      }

      queryClient.setQueryData(["game", options.gameId], {
        ...previousGame,
        stars: previousGame.stars - 1,
        starred: false,
      });

      return { previousGame };
    },
    onSuccess() {
      return queryClient.invalidateQueries(["games"], { exact: false });
    },
  });
}

export function useAddStar() {
  return useMutation({
    mutationFn: addStar,
    async onMutate(options) {
      await queryClient.cancelQueries("game");

      const previousGame = queryClient.getQueryData<Game>([
        "game",
        options.gameId,
      ]);

      if (previousGame) {
        queryClient.setQueryData(["game", options.gameId], {
          ...previousGame,
          stars: previousGame.stars + 1,
          starred: true,
        });
      }

      return { previousGame };
    },
    onSuccess() {
      return queryClient.invalidateQueries(["games"], { exact: false });
    },
  });
}
