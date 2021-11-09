import * as React from "react";
import * as Sentry from "@sentry/react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";


import { startServices, stopServices } from "@/game";
import { MediaPlayer } from "@/components/MediaPlayer";
import { NavBar } from "@/components/NavBar";
import isUuid from "@/utils/isUuid";
import { ProxyStoreConsumer } from "@/providers/ProxyStoreProvider";
import { MediaService, getMediaService } from "@/game/xstate/services";
import BackgroundImage from "@/assets/images/background.jpg";
import DefaultImage from "@/assets/images/default-image.jpg";
import { MediaMachineContext } from "@/game/xstate/machines/mediaMachine";
import { YouTubeVideo } from "@/components/YouTubeVideo";
import { Head } from "@/components/Head";

import { ErrorCard } from "../components/ErrorCard";
import ExitGamePrompt from "../components/ExitGamePrompt";
import { SoloGameCard } from "../components/SoloGameCard";
import SharedGameCard from "../components/SharedGameCard";
import { HUD } from "../components/HUD";


const useStyles = makeStyles(() => ({
  progress: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
  },
  container: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "black",
  },
  startGame: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: `url(${BackgroundImage})`,
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
}));

function handleSlideChange() {
  MediaService.nextLink();
}

export function Game() {
  const params = useParams<{ config: string }>();
  const history = useHistory();
  const location = useLocation<{
    configured: true;
  }>();
  const classes = useStyles();
  const [gameStarted, setGameStarted] = React.useState(false);
  const [error, setError] = React.useState<string>();
  const [media, setMedia] = React.useState<MediaMachineContext>();
  const [loading, setLoading] = React.useState<boolean>(true);

  const activeLink = media?.links[media.linkIndex];
  const gameConfigId = params.config;

  const handleStartGame = React.useCallback(async () => {
    await startServices();
    setGameStarted(true);

    getMediaService().onTransition((media) => setMedia(media.context));
  }, []);

  React.useEffect(() => {
    if (gameConfigId) {
      !isUuid(gameConfigId) && setError("The game config link is invalid");
    }

    Sentry.setTag("page", "game");
    Sentry.setContext("game_config", {
      gameConfigId,
    });

    setLoading(false);

    return () => {
      gameStarted && stopServices();
    };
  }, [history, location, params, gameStarted, gameConfigId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <>
        <Head title="Game" />
        <NavBar />
        <div className={classes.startGame}>
          <Paper style={{ padding: 10 }}>
            <ErrorCard error={error} />
          </Paper>
        </div>
      </>
    );
  }

  if (!gameStarted) {
    return (
      <>
        <Head title="Game" />
        <NavBar />
        <div className={classes.startGame}>
          {gameConfigId ? (
            <SharedGameCard
              gameConfigId={gameConfigId}
              onStart={handleStartGame}
            />
          ) : (
            <SoloGameCard onStart={handleStartGame} />
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <Head title="Game" />
      <ProxyStoreConsumer>
        {(store) => {
          if (!store) {
            return;
          }

          const {
            game: { youtube },
            config: { slideDuration },
          } = store;

          return (
            <div className={classes.container}>
              <ExitGamePrompt />
              <HUD />
              {(youtube && <YouTubeVideo src={youtube} />) ||
                (activeLink && (
                  <MediaPlayer
                    link={activeLink}
                    duration={slideDuration}
                    onEnded={handleSlideChange}
                  />
                )) || (
                  <img className={classes.image} src={DefaultImage} alt="" />
                )}
            </div>
          );
        }}
      </ProxyStoreConsumer>
    </>
  );
}
