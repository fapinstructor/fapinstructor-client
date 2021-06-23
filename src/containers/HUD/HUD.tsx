import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import store from "store";
import StatusPanel from "containers/StatusPanel";
import TriggerPanel from "containers/TriggerPanel";
import PersistentTriggerPanel from "containers/PersistentTriggerPanel";
import FullScreenButton from "components/molecules/buttons/FullScreenButton";
import BookmarkButton from "components/molecules/buttons/BookmarkButton";
import SkipPreviousButton from "components/molecules/buttons/SkipPreviousButton";
import SkipNextButton from "components/molecules/buttons/SkipNextButton";
import HomeButton from "components/atoms/HomeButton";
import { Notify } from "common/store/notifications";
import BeatMeter from "components/organisms/BeatMeter";
import { useSelector } from "react-redux";
import { selectGame } from "common/store/currentGame";
import StarButton from "components/molecules/buttons/StarButton";

import { useMediaService } from "game/xstate/services";
import { selectEnableBeatMeter } from "common/store/settings";

const useStyles = makeStyles(() => ({
  root: {
    position: "absolute",
    height: "100vh",
    width: "100vw",
    pointerEvents: "none",
  },
}));

export type HUDProps = {
  createNotification: (notification: Notify) => void;
};

export default function HUD({ createNotification }: HUDProps) {
  const classes = useStyles();
  const currentGame = useSelector(selectGame);
  const [{ context: media }, sendMediaEvent] = useMediaService();
  const enableBeatMeter = useSelector(selectEnableBeatMeter);

  const bookmark = () => {
    const link = media.links[media.linkIndex];

    createNotification({
      message: "Bookmarked",
      dismissible: true,
    });

    if (link && link.sourceLink) {
      store.game.bookmarks.push({
        href: link.directLink,
        src: link.sourceLink,
      });
    }
  };

  return (
    <div className={classes.root}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              width: "100%",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <div>
              <StatusPanel />
              <PersistentTriggerPanel />
            </div>
            <div>
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
                <SkipNextButton onClick={() => sendMediaEvent("NEXT_LINK")} />
                <SkipPreviousButton
                  onClick={() => sendMediaEvent("PREVIOUS_LINK")}
                />
                <BookmarkButton onClick={bookmark} />
                {currentGame ? (
                  <StarButton
                    color="inherit"
                    gameId={currentGame.id}
                    stars={currentGame.stars}
                    starred={currentGame.starred}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div>
          <TriggerPanel />
          {enableBeatMeter && <BeatMeter />}
        </div>
      </div>
    </div>
  );
}
