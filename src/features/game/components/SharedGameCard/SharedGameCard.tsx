import { useEffect } from "react";
import { Box, Button, CircularProgress } from "@material-ui/core";

import { NodeRow } from "@/components/Templates";
import store from "@/store";
import deepCopy from "@/utils/deepCopy";
import Profile from "@/common/types/Profile";
import { StarButton } from "@/features/game";

import { BackToConfigButton } from "../BackToConfigButton";
import { ErrorCard } from "../ErrorCard";
import { useGame } from "../../api/getGame";
import { Game } from "../../types/Game";

import GameSummaryCard from "./GameSummaryCard";

export type SharedGameCardProps = {
  gameConfigId: string;
  onStart: (game: Game) => void;
  profile: Profile | null;
  appendGameHistory: (userId: string, gameId: string) => void;
};

export default function SharedGameCard({
  profile,
  appendGameHistory,
  gameConfigId,
  onStart,
}: SharedGameCardProps) {
  const gameQuery = useGame({ gameId: gameConfigId });

  useEffect(() => {
    const game = gameQuery.data;

    if (game) {
      store.title = game.title;
      store.tags = game.tags;
      store.config = deepCopy(game.config);
    }
  }, [gameQuery]);

  if (gameQuery.isLoading) {
    return (
      <Box p={5}>
        <CircularProgress size={100} thickness={2} />
      </Box>
    );
  }

  if (gameQuery.isError) {
    return <ErrorCard error="An error occurred loading the game." />;
  }

  if (!gameQuery.data) return null;

  const game = gameQuery.data;

  return (
    <GameSummaryCard game={game}>
      <NodeRow>
        <StarButton
          gameId={game.id}
          stars={game.stars}
          starred={game.starred}
          variant="outlined"
        />
        <Button
          onClick={() => {
            if (profile && game) {
              appendGameHistory(profile.id, game.id);
            }
            onStart(game);
          }}
          variant="contained"
          color="primary"
        >
          start game
        </Button>
        <BackToConfigButton />
      </NodeRow>
    </GameSummaryCard>
  );
}
