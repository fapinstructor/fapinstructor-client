import React from "react";
import * as Sentry from "@sentry/react";
import { withRouter, Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { startGame, stopGame } from "game";
import store from "store";
import { Paper } from "@material-ui/core";
import HUD from "containers/HUD";
import MediaPlayer from "components/organisms/MediaPlayer";
import NavBar from "components/organisms/NavBar";
import isUUID from "utils/is-uuid";
import config from "config";
import ErrorCard from "components/molecules/ErrorCard";
import SharedGameCard from "components/organisms/SharedGameCard";
import SoloGameCard from "components/organisms/SoloGameCard";
import { ProxyStoreConsumer } from "containers/StoreProvider";
import ExitGamePrompt from "components/organisms/ExitGamePrompt";
import { MediaService, getMediaService } from "game/xstate/services";

const DEFAULT_BACKGROUND_IMAGE = `${config.imageUrl}/default-image.jpg`;

const styles = () => ({
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
  startgame: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: `url(${config.imageUrl}/background.jpg)`,
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
});

function handleSlideChange() {
  MediaService.nextLink();
}

class GamePage extends React.Component {
  state = {
    gameStarted: false,
    error: null,
    isSharedGame: false,
    gameConfigId: null,
  };

  async componentDidMount() {
    const gameConfigId = this.props.match.params.config;

    if (gameConfigId) {
      this.setState({
        isSharedGame: true,
        gameConfigId,
      });

      if (!isUUID(gameConfigId)) {
        this.setState({
          error: "The game config link is invalid",
        });
      }
    } else if (store.config.isDefaultConfig) {
      this.props.history.push("/");
    } else {
      this.setState({
        isSharedGame: false,
      });
    }

    Sentry.setTag("page", "game");
    Sentry.setContext("game_config", {
      gameConfigId,
    });
  }

  componentWillUnmount() {
    stopGame();
  }

  handleStartGame = () => {
    startGame().then((gameStarted) => {
      this.setState({ gameStarted });

      getMediaService().onTransition((media) =>
        this.setState({ media: media.context })
      );
    });
  };

  render() {
    const { media, gameStarted, isSharedGame, gameConfigId, error } =
      this.state;
    const { classes } = this.props;

    const activeLink = media && media.links[media.linkIndex];

    if (!gameStarted) {
      return (
        <>
          <NavBar />
          <div className={classes.startgame}>
            <Paper style={{ padding: 10 }}>
              {error && <ErrorCard error={error} />}
              {!error && isSharedGame && (
                <SharedGameCard
                  gameConfigId={gameConfigId}
                  onStart={this.handleStartGame}
                />
              )}
              {!error && !isSharedGame && (
                <SoloGameCard onStart={this.handleStartGame} />
              )}
            </Paper>
          </div>
        </>
      );
    }

    return (
      <ProxyStoreConsumer>
        {({
          game: { orgasms },
          config: { maximumOrgasms, slideDuration },
          videoMuted,
        }) => (
          <div className={this.props.classes.container}>
            {parseInt(maximumOrgasms, 10) === parseInt(orgasms, 10) ? (
              <Redirect to="/endgame" />
            ) : (
              <>
                <ExitGamePrompt />
                <HUD />
                {(activeLink && (
                  <MediaPlayer
                    link={activeLink}
                    duration={slideDuration}
                    muted={videoMuted}
                    onEnded={handleSlideChange}
                  />
                )) || (
                  <img
                    className={classes.image}
                    src={DEFAULT_BACKGROUND_IMAGE}
                    alt=""
                  />
                )}
              </>
            )}
          </div>
        )}
      </ProxyStoreConsumer>
    );
  }
}

export default withRouter(withStyles(styles)(GamePage));
