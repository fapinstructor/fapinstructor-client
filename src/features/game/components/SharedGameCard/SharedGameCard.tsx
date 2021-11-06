import { useEffect } from "react";
import { Box, Button, CircularProgress } from "@material-ui/core";
import NodeRow from "@/components/templates/NodeRow";
import ErrorCard from "@/components/molecules/ErrorCard";
import GameSummaryCard from "@/components/molecules/GameSummaryCard";
import BackToConfigButton from "@/components/molecules/buttons/BackToConfigButton";
import store from "@/store";
import deepCopy from "@/utils/deepCopy";
import Game from "@/common/types/Game";
import Profile from "@/common/types/Profile";
import StarButton from "@/components/molecules/buttons/StarButton";

export type SharedGameCardProps = {
  gameConfigId: string;
  onStart: () => void;
  loading: boolean;
  error: string | null;
  game: Game | null;
  profile: Profile | null;
  fetchGame: (gameId: string) => void;
  appendGameHistory: (userId: string, gameId: string) => void;
};

export default function SharedGameCard({
  loading,
  error,
  game,
  profile,
  fetchGame,
  appendGameHistory,
  gameConfigId,
  onStart,
}: SharedGameCardProps) {
  useEffect(() => {
    fetchGame(gameConfigId);
  }, [gameConfigId, fetchGame]);

  useEffect(() => {
    if (game) {
      store.title = game.title;
      store.tags = game.tags;
      store.config = deepCopy(game.config);
    }
  }, [game]);

  const handleStart = () => {
    if (profile && game) {
      appendGameHistory(profile.id, game.id);
    }
    onStart();
  };

  if (loading) {
    return (
      <Box p={5}>
        <CircularProgress size={100} thickness={2} />
      </Box>
    );
  }

  if (error) {
    return <ErrorCard error={error} />;
  }

  let content = null;
  if (game) {
    content = (
      <GameSummaryCard game={game}>
        <NodeRow>
          <StarButton
            gameId={game.id}
            stars={game.stars}
            starred={game.starred}
            variant="outlined"
          />
          <Button onClick={handleStart} variant="contained" color="primary">
            start game
          </Button>
          <BackToConfigButton />
        </NodeRow>
      </GameSummaryCard>
    );
  }
  return content;
}
