import * as React from "react";

import { ConnectHandy } from "@/features/handy";
import { StarButton } from "@/features/game";

import { useGame } from "../api/getGame";

import { HomeButton } from "./HomeButton";
import { BookmarkButton } from "./BookmarkButton";
import { FullScreenButton } from "./FullScreenButton";
import { SkipNextButton } from "./SkipNextButton";
import { SkipPreviousButton } from "./SkipPreviousButton";

type HUDButtonProps = {
  gameId?: string;
};

export const HUDButtons = React.memo(function HUDButtons({
  gameId,
}: HUDButtonProps) {
  const gameQuery = useGame({ gameId });

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row-reverse",
        pointerEvents: "auto",
        color: "white",
        alignItems: "center",
      }}
    >
      <FullScreenButton />
      <HomeButton />
      <SkipNextButton />
      <SkipPreviousButton />
      <BookmarkButton />
      {gameQuery.data && (
        <StarButton
          color="inherit"
          gameId={gameQuery.data.id}
          stars={gameQuery.data.stars}
          starred={gameQuery.data.starred}
        />
      )}
      <ConnectHandy variant="icon" />
    </div>
  );
});
