import React from "react";
import { useSelector } from "react-redux";

import BookmarkButton from "components/molecules/buttons/BookmarkButton";
import FullScreenButton from "components/molecules/buttons/FullScreenButton";
import HomeButton from "components/atoms/HomeButton";
import SkipNextButton from "components/molecules/buttons/SkipNextButton";
import SkipPreviousButton from "components/molecules/buttons/SkipPreviousButton";
import StarButton from "components/molecules/buttons/StarButton";
import { selectGame } from "common/store/currentGame";

const HUDButtons = React.memo(function HUDButtons() {
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
    </div>
  );
});

export default HUDButtons;
