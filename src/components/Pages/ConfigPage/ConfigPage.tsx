import { Box, Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { Formik, Form } from "formik";
import styled from "styled-components/macro";

import { MediaType } from "common/types/Media";
import store from "store";
import {
  defaultConfig,
  GameConfig,
  isDefaultConfig,
  OldGameConfig,
} from "configureStore";
import theme from "theme";
import { validSubreddit } from "utils/regex";
import { getEnabledMediaTypes } from "game/xstate/machines/mediaMachine";
import Footer from "components/organisms/Footer";
import ShareGame from "components/organisms/ShareGame";
import AutoFocusFieldErrors from "components/organisms/AutoFocusFieldErrors";
import Stack from "components/templates/Stack";
import Cluster from "components/templates/Cluster";
import RuinedOrgasmsStep from "./components/Form/RuinedOrgasmsStep";
import PostOrgasmTortureStep from "./components/Form/PostOrgasmTortureStep";
import TaskStep from "./components/Form/TaskStep";
import MediaStep from "./components/Form/MediaStep";
import OrgasmStep from "./components/Form/OrgasmStep";
import EdgingStep from "./components/Form/EdgingStep";
import StrokeStep from "./components/Form/StrokeStep";
import GameDurationStep from "./components/Form/GameDurationStep";

const GAME_CONFIG_SCHEMA = yup.object().shape({
  subreddits: yup
    .array()
    .of(
      yup
        .string()
        .trim()
        .lowercase()
        .required()
        .min(
          3,
          ({ value, min }) =>
            `Subreddit  '${value}' cannot be shorter than ${min} characters.`
        )
        .max(
          21,
          ({ value, max }) =>
            `Subreddit '${value}' cannot be longer than ${max} characters.`
        )
        .matches(
          validSubreddit,
          ({ value }) => `Subreddit '${value}' is an invalid name.`
        )
    )
    .unique()
    .min(1, "Please specify at least one subreddit."),
  slideDuration: yup.number().min(3),
  imageType: yup.array().min(1, "One media type must be selected."),
  gameLength: yup.object().shape({
    min: yup
      .number()
      .min(
        1,
        ({ min }) => `Game duration cannot be shorter than ${min} minute.`
      ),
    max: yup
      .number()
      .min(
        yup.ref("min"),
        "Maximum game duration must be greater than the minimum game duration."
      ),
  }),
  postOrgasmTortureDuration: yup.object().shape({
    min: yup.number().min(0, "Minimum post orgasm time cannot be less than 0."),
    max: yup
      .number()
      .min(
        yup.ref("min"),
        "Maximum duration must be greater than minimum duration."
      ),
  }),
  ruinedOrgasms: yup.object().shape({
    min: yup.number().min(0, "Minimum ruined orgasms cannot be less than 0."),
    max: yup
      .number()
      .min(
        yup.ref("min"),
        "Maximum ruined orgasms must be greater than the minimum ruined orgasms."
      ),
  }),
  strokeSpeed: yup.object().shape({
    min: yup.number().min(0, "Minimum stroke speed cannot be less than 0."),
    max: yup
      .number()
      .max(8, "Maximum stroke speed cannot be greater than 8.")
      .min(
        yup.ref("min"),
        "Maximum stroke speed must be greater than minimum stroke speed."
      ),
  }),
  minimumEdges: yup
    .number()
    .min(0, "Minimum edges cannot be less than 0.")
    .max(1000),
  maximumOrgasms: yup.number().min(0),
  ruinCooldown: yup.number().min(0),
  edgeCooldown: yup.number().min(0),
  edgeFrequency: yup.number().min(0).max(100),
  // TODO: Test that the sum of probabilities matches 100%
  probabilities: yup.object().shape({
    orgasmProbability: yup.number().min(0),
    deniedProbability: yup.number().min(0),
    ruinedProbability: yup.number().min(0),
  }),
});

function mapOldConfigToNewConfig(oldConfig: OldGameConfig) {
  const newConfig = {
    subreddits: oldConfig.redditId.split(",").map((r) => r.trim()),
    slideDuration: oldConfig.slideDuration,
    imageType: getEnabledMediaTypes(oldConfig),
    gameLength: {
      min: oldConfig.minimumGameTime,
      max: oldConfig.maximumGameTime,
    },
    probabilities: {
      orgasmProbability: 100,
      deniedProbability: 0,
      ruinedProbability: 0,
    },
    postOrgasmTorture: oldConfig.postOrgasmTorture,
    postOrgasmTortureDuration: {
      min: oldConfig.postOrgasmTortureMinimumTime,
      max: oldConfig.postOrgasmTortureMaximumTime,
    },
    ruinedOrgasms: {
      min: oldConfig.minimumRuinedOrgasms,
      max: oldConfig.maximumRuinedOrgasms,
    },
    edgeCooldown: oldConfig.edgeCooldown,
    ruinCooldown: oldConfig.ruinCooldown,
    minimumEdges: oldConfig.minimumEdges,
    edgeFrequency: oldConfig.edgeFrequency,
    strokeSpeed: {
      min: oldConfig.slowestStrokeSpeed,
      max: oldConfig.fastestStrokeSpeed,
    },
    minimumOrgasms: oldConfig.minimumOrgasms || 1,
    maximumOrgasms: oldConfig.maximumOrgasms,
    initialGripStrength: oldConfig.initialGripStrength,
    // Values that don't have an input field
    defaultStrokeStyle: oldConfig.defaultStrokeStyle,
    actionFrequency: oldConfig.actionFrequency,
    tasks: oldConfig.tasks,
  };

  return newConfig;
}

function mapNewConfigToOldConfig(newConfig: GameConfig) {
  const oldConfig: OldGameConfig = {
    redditId: newConfig.subreddits.join(","),
    gifs: newConfig.imageType.includes(MediaType.Gif),
    pictures: newConfig.imageType.includes(MediaType.Picture),
    videos: newConfig.imageType.includes(MediaType.Video),
    slideDuration: newConfig.slideDuration,
    allowedProbability: newConfig.probabilities.orgasmProbability,
    deniedProbability: newConfig.probabilities.deniedProbability,
    ruinedProbability: newConfig.probabilities.ruinedProbability,
    minimumGameTime: newConfig.gameLength.min,
    maximumGameTime: newConfig.gameLength.max,
    minimumEdges: newConfig.minimumEdges,
    minimumOrgasms: newConfig.minimumOrgasms,
    maximumOrgasms: newConfig.maximumOrgasms,
    minimumRuinedOrgasms: newConfig.ruinedOrgasms.min,
    maximumRuinedOrgasms: newConfig.ruinedOrgasms.max,
    postOrgasmTorture: newConfig.postOrgasmTorture,
    postOrgasmTortureMinimumTime: newConfig.postOrgasmTortureDuration.min,
    postOrgasmTortureMaximumTime: newConfig.postOrgasmTortureDuration.max,
    edgeCooldown: newConfig.edgeCooldown,
    edgeFrequency: newConfig.edgeFrequency,
    ruinCooldown: newConfig.ruinCooldown,
    slowestStrokeSpeed: newConfig.strokeSpeed.min,
    fastestStrokeSpeed: newConfig.strokeSpeed.max,
    initialGripStrength: newConfig.initialGripStrength,
    defaultStrokeStyle: newConfig.defaultStrokeStyle,
    actionFrequency: newConfig.actionFrequency,
    tasks: newConfig.tasks,
  };

  return oldConfig;
}

export default function ConfigPage() {
  const history = useHistory();

  return (
    <>
      <Formik<GameConfig>
        initialValues={mapOldConfigToNewConfig(
          isDefaultConfig(store.config) ? defaultConfig : store.config
        )}
        validationSchema={GAME_CONFIG_SCHEMA}
        onSubmit={async (formValues) => {
          store.config = mapNewConfigToOldConfig(formValues);
          history.push("/game");
        }}
      >
        {({ errors }) => {
          if (Object.keys(errors).length) {
            console.log("errors:", errors);
          }
          return (
            <AutoFocusFieldErrors>
              <StyledForm>
                <Stack>
                  <Typography variant="h2" component="h1" color="secondary">
                    Create a game
                  </Typography>
                  <Typography color="secondary" variant="body1">
                    Tweak your desired settings below to create any desired
                    experience.
                  </Typography>
                  <GameDurationStep />
                  <MediaStep />
                  <StrokeStep />
                  <OrgasmStep />
                  <EdgingStep />
                  <RuinedOrgasmsStep />
                  <PostOrgasmTortureStep />
                  <TaskStep />
                  <Box p={3}>
                    <Cluster>
                      <Button
                        type="submit"
                        title="Starts the game."
                        variant="contained"
                        color="primary"
                      >
                        Start
                      </Button>
                      <ShareGame disabled={Object.keys(errors).length > 0} />
                    </Cluster>
                  </Box>
                </Stack>
              </StyledForm>
            </AutoFocusFieldErrors>
          );
        }}
      </Formik>
      <Footer />
    </>
  );
}

const StyledForm = styled(Form)`
  padding-top: 2rem;
  display: grid;
  grid-auto-rows: min-content;

  grid-template-columns: 1fr;
  grid-column-gap: 16;
  grid-template-columns: min(60ch, calc(100% - 32px));
  justify-content: center;

  @media screen and (${theme.breakpoint.desktop.up}) {
    grid-template-columns: 1fr 1.5fr 1fr;

    & > * {
      grid-column: 2;
    }
  }
`;
