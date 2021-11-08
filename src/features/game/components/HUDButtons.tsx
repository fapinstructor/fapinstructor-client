import * as React from "react";
import { useSelector } from "react-redux";

import { StarButton } from "@/components/StarButton";
import { selectGame } from "@/common/store/currentGame";
import { ConnectHandy } from "@/features/handy";

import { HomeButton } from "./HomeButton";
import { BookmarkButton } from "./BookmarkButton";
import { FullScreenButton } from "./FullScreenButton";
import { SkipNextButton } from "./SkipNextButton";
import { SkipPreviousButton } from "./SkipPreviousButton";

export const HUDButtons = React.memo(function HUDButtons() {
  const currentGame = useSelector(selectGame);
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
      {currentGame && (
        <StarButton
          color="inherit"
          gameId={currentGame.id}
          stars={currentGame.stars}
          starred={currentGame.starred}
        />
      )}
      <ConnectHandy variant="icon" />
    </div>
  );
});
