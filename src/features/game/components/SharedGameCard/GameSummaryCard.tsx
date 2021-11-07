import * as React from "react";
import { Typography } from "@material-ui/core";
import { Group } from "@/components/Group";
import { Tags } from "@/components/Tags";
import Game from "@/common/types/Game";
import styled from "styled-components/macro";
import Stack from "@/components/templates/Stack";

export type GameSummaryCardProps = {
  game: Game;
  children: React.ReactNode;
};

const ContentContainer = styled(Stack)`
  --space: 0.5rem;
`;

export default function GameSummaryCard({
  game,
  children,
}: GameSummaryCardProps) {
  return (
    <Group title="Game Summary">
      <ContentContainer>
        <Typography variant="h6" gutterBottom>
          {game.title}
        </Typography>
        <Typography variant="body1">Game Duration</Typography>
        <Typography variant="body2" gutterBottom>
          {game.config.gameDuration.min}-{game.config.gameDuration.max} min
        </Typography>
        {game.tags && game.tags.length > 0 && (
          <>
            <Typography variant="body1">Tags</Typography>
            <Tags tags={game.tags} />
          </>
        )}
      </ContentContainer>
      {children}
    </Group>
  );
}
