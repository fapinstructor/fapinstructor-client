import { makeStyles } from "@material-ui/core/styles";
import { Button, Paper } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { Formik, Form } from "formik";

import { MediaType } from "common/types/Media";
import store from "store";
import { defaultConfig, isDefaultConfig } from "configureStore";
import Footer from "components/organisms/Footer";
import ShareGame from "components/organisms/ShareGame";
import { validSubreddit } from "utils/regex";
import BackgroundImage from "images/background.jpg";
import TaskStep from "./components/Form/TaskStep";
import MediaStep from "./components/Form/MediaStep";
import OrgasmStep from "./components/Form/OrgasmStep";
import EdgingStep from "./components/Form/EdgingStep";
import StrokeStep from "./components/Form/StrokeStep";
import TimeStep from "./components/Form/TimeStep";
import { getEnabledMediaTypes } from "game/xstate/machines/mediaMachine";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(),
  },
  background: {
    background: `url(${BackgroundImage})`,
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
  },
  formContainer: {
    display: "flex",
    justifyContent: "center",
    padding: "0px 5vw 5vh 5vw",
    paddingTop: 30,
  },
  form: {
    padding: 20,
    marginBottom: 20,
    width: "90vw",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
}));

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
    .required(),
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
    min: yup
      .number()
      .min(0, "Minimum post orgasm time cannot be a negative number."),
    max: yup
      .number()
      .min(
        yup.ref("min"),
        "Maximum duration must be greater than minimum duration."
      ),
  }),
  ruinedOrgasms: yup.object().shape({
    min: yup.number().min(0),
    max: yup
      .number()
      .min(
        yup.ref("min"),
        "Maximum ruined orgasms must be greater than minimum ruined orgasms."
      ),
  }),
  strokeSpeed: yup.object().shape({
    min: yup.number().min(0.25),
    max: yup
      .number()
      .max(8)
      .min(
        yup.ref("min"),
        "Maximum stroke speed must be greater than minimum stroke speed."
      ),
  }),
  minimumEdges: yup.number().min(0),
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

function mapOldCOnfigToNewConfig(oldConfig) {
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
    enableRuinedOrgasms: oldConfig.maximumRuinedOrgasms > 0,
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

function mapNewConfigToOldConfig(newConfig) {
  const oldConfig = {
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
    minimumOrgasms: newConfig.minimumOrgasms,
    maximumOrgasms: newConfig.maximumOrgasms,
    minimumRuinedOrgasms: newConfig.enableRuinedOrgasms
      ? newConfig.ruinedOrgasms.min
      : 0,
    maximumRuinedOrgasms: newConfig.enableRuinedOrgasms
      ? newConfig.ruinedOrgasms.max
      : 0,
    postOrgasmTorture: newConfig.postOrgasmTorture,
    postOrgasmTortureMinimumTime: newConfig.postOrgasmTortureDuration.min,
    postOrgasmTortureMaximumTime: newConfig.postOrgasmTortureDuration.max,
    edgeCooldown: newConfig.edgeCooldown,
    edgeFrequency: newConfig.edgeFrequency,
    ruinCooldown: newConfig.ruinCooldown,
    slowestStrokeSpeed: newConfig.strokeSpeed.min,
    fastestStrokeSpeed: newConfig.strokeSpeed.max,
    defaultStrokeStyle: newConfig.defaultStrokeStyle,
    actionFrequency: newConfig.actionFrequency,
    tasks: newConfig.tasks,
  };

  return oldConfig;
}

/**
 * TODO:
 * - Convert to typescript.
 * - Organize the code directory structure.
 * - Make form a11y.
 * - Make form responsive to screen sizes.
 * - Test default games, saved games, and all of the above.
 * - Add tests.
 * - Error handling.
 * - Get ride of the mapping functions and use the new structure somehow.
 */
export default function ConfigPage() {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Formik
      initialValues={mapOldCOnfigToNewConfig(
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
          <Form>
            <div className={classes.background}>
              <div className={classes.formContainer}>
                <Paper elevation={10} className={classes.form}>
                  <MediaStep errors={errors} />
                  <TimeStep />
                  <OrgasmStep />
                  <EdgingStep />
                  <StrokeStep />
                  <TaskStep />
                  <Button
                    type="submit"
                    title="Starts the game."
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Start
                  </Button>
                  <ShareGame disabled={Object.keys(errors).length > 0} />
                  <Footer />
                </Paper>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
