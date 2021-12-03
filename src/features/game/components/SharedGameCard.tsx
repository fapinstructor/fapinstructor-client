import { useEffect } from "react";
import { Box, Button, CircularProgress } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";

import { NodeRow } from "@/components/Templates";
import store from "@/store";
import deepCopy from "@/utils/deepCopy";
import { StarButton } from "@/features/game";

import { useGame } from "../api/getGame";
import { useAppendGameHistory } from "../api/appendGameHistory";
import { Game } from "../types/Game";

import { BackToConfigButton } from "./BackToConfigButton";
import { ErrorCard } from "./ErrorCard";
import GameSummaryCard from "./GameSummaryCard";

export type SharedGameCardProps = {
  gameConfigId: string;
  onStart: (game: Game) => void;
};

export default function SharedGameCard({
  gameConfigId,
  onStart,
}: SharedGameCardProps) {
  const { user } = useAuth0();
  const gameQuery = useGame({ gameId: gameConfigId });
  const appendGameHistoryMutation = useAppendGameHistory();

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
            if (user?.sub && game) {
              appendGameHistoryMutation.mutate({
                gameId: game.id,
                userId: user.sub,
              });
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
