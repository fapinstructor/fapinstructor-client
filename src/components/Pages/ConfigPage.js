import React from "react";
import store from "store";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  Paper,
  Select,
  Switch,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  MenuItem,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withRouter } from "react-router-dom";
import { getRandomBoolean } from "utils/math";
import Group from "components/molecules/Group";
import TaskList from "containers/TaskList";
import {
  GripStrength,
  GripStrengthString,
} from "game/xstate/machines/gripMachine";
import config from "config";
import ShareGame from "components/organisms/ShareGame";
import { validSubreddit } from "utils/regex";

const ONE_HUNDRED_PERCENT = 100; // Maximum Percentage that Can be achieved

const styles = (theme) => ({
  control: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(),
  },
  background: {
    background: `url(${config.imageUrl}/background.jpg)`,
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
  form2: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "90vw",
  },
});

class ConfigPage extends React.Component {
  state = {
    errors: {},
    exception: null,
    tags: [],
  };

  componentDidMount() {
    if (store.config.isDefaultConfig) {
      delete store.config.isDefaultConfig;
    }
  }

  handleStartGame = () => {
    this.props.history.push("/game");
  };

  setTags = (tags) => {
    this.setState({
      tags,
    });
  };

  validateConfig = () => {
    const errors = {};

    for (let name in store.config) {
      let value = store.config[name];
      switch (name) {
        case "redditId": {
          if (!value) {
            errors.redditId = "Must enter at least one value";
          }

          const subreddits = value.split(",").map((v) => v.trim());
          for (let i = 0; i < subreddits.length; i++) {
            if (!validSubreddit.test(subreddits[i])) {
              errors.redditId = `Subreddit ${subreddits[i]} is invalid`;
              break;
            }
          }
          break;
        }
        case "gifs":
        case "pictures": {
          delete errors.imageType;
          if (
            !store.config.gifs &&
            !store.config.pictures &&
            !store.config.videos
          ) {
            errors.imageType = "Must select at least one value";
          }
          break;
        }
        case "slideDuration": {
          delete errors[name];
          if (!value || value < 3) {
            errors[name] = "Slide Duration is less than 3 seconds";
          }
          break;
        }
        case "minimumGameTime":
        case "maximumGameTime": {
          delete errors["minimumGameTime"];
          delete errors["maximumGameTime"];
          if (!value || store.config.minimumGameTime < 1) {
            errors["minimumGameTime"] =
              "Minimum Game Time must be at least 1 minutes";
          }
          if (!value || value < 2) {
            errors["maximumGameTime"] =
              "Maximum Game Time must be at least 2 minutes";
          }
          if (
            parseInt(store.config.maximumGameTime, 10) <
            parseInt(store.config.minimumGameTime, 10)
          ) {
            errors["minimumGameTime"] =
              "Minimum Game Time has to be smaller than Maximum Game Time";
            errors["maximumGameTime"] =
              "Maximum Game Time has to be greater than Minimum Game Time";
          }
          break;
        }
        case "finalOrgasmAllowed":
        case "finalOrgasmDenied":
        case "finalOrgasmRuined": {
          delete errors.finialOrgasm;
          if (
            !store.config.finalOrgasmAllowed &&
            !store.config.finalOrgasmDenied &&
            !store.config.finalOrgasmRuined
          ) {
            errors.finialOrgasm = "Must select at least one value";
          }

          break;
        }
        case "allowedProbability":
        case "deniedProbability":
        case "ruinedProbability": {
          delete errors[name];
          value = parseInt(value, 10);
          if (isNaN(value) || value < 0 || value > ONE_HUNDRED_PERCENT) {
            errors[name] = "Please insert a valid number between 0 and 100";
          }
          break;
        }
        case "finalOrgasmRandom": {
          delete errors.finalOrgasmRandom;
          const {
            config: {
              allowedProbability,
              deniedProbability,
              ruinedProbability,
            },
          } = store;
          if (
            parseInt(deniedProbability, 10) +
              parseInt(ruinedProbability, 10) +
              parseInt(allowedProbability, 10) !==
            ONE_HUNDRED_PERCENT
          ) {
            errors.finalOrgasmRandom =
              "The probabilities have to sum up to 100%";
          }
          break;
        }

        // Why has maximumOrgasms to be at least 1?
        //   - It stands for maximumGameEnds and there has to be at least 1 gameEnd
        // why not can't it be 0 what would logically be possible?
        //   - this also is the reason why it can not be 0
        case "maximumOrgasms": {
          delete errors[name];
          value = parseInt(value, 10);
          if (!value) {
            errors[name] = "Please specify a value";
          } else if (value < 0) {
            errors[name] = "Has to be positive";
          }
          break;
        }
        case "postOrgasmTortureMinimumTime": {
          delete errors[name];
          if (value < 1) {
            errors[name] = "Cannot be less than 3";
          }
          break;
        }
        case "postOrgasmTortureMaximumTime": {
          delete errors[name];
          value = parseInt(value, 10);
          if (value < parseInt(store.config.postOrgasmTortureMinimumTime, 10)) {
            errors[name] = "Must be greater than the minimum";
          }
          if (!value || value < 5) {
            errors[name] = "Must be greater than 5 seconds";
          }
          break;
        }
        case "minimumEdges": {
          delete errors[name];
          value = parseInt(value, 10);
          if (isNaN(value) || value < 0) {
            errors[name] = "Cannot be less than 0";
          }
          break;
        }
        case "edgeCooldown": {
          delete errors[name];
          value = parseInt(value, 10);
          if (isNaN(value) || value < 0) {
            errors[name] = "Cannot be less than 0";
          }
          break;
        }
        case "edgeFrequency": {
          delete errors[name];
          value = parseInt(value, 10);
          if (isNaN(value) || value < 0) {
            errors[name] = "Cannot be less than 0";
          }
          break;
        }
        case "minimumRuinedOrgasms": {
          delete errors[name];
          value = parseInt(value, 10);
          if (isNaN(value) || value < 0) {
            errors[name] = "Cannot be less than 0";
          }
          break;
        }
        case "maximumRuinedOrgasms": {
          delete errors[name];
          if (
            parseInt(value, 10) <
            parseInt(store.config.minimumRuinedOrgasms, 10)
          ) {
            errors[name] =
              "Maximum Ruined Orgasms cannot be less than Minimum Ruined Orgasms";
          }
          break;
        }
        case "ruinCooldown": {
          delete errors[name];
          value = parseInt(value, 10);
          if (isNaN(value) || value < 0) {
            errors[name] = "Cannot be less than 0";
          }
          break;
        }
        case "slowestStrokeSpeed": {
          delete errors[name];
          if (isNaN(value) || value < 0.25) {
            errors[name] = "Cannot be less than 0.25";
          }
          if (value > 6) {
            errors[name] = "Cannot be greater than 6";
          }
          break;
        }
        case "fastestStrokeSpeed": {
          delete errors[name];
          if (isNaN(value) || value < store.config.slowestStrokeSpeed) {
            errors[name] = "Cannot be less than the slowest stroke speed";
          }
          if (value > 6) {
            errors[name] = "Cannot be greater than 6";
          }
          break;
        }
        default: {
        }
      }
    }

    return errors;
  };

  /**
   * handles most changes by the user that can happen on the ConfigPage.
   * It either casts the value by using the specified function or does not cast anything if no cast function is
   * specified.
   *
   * After every single change the complete Page is validated.
   *
   * @param name
   *    the name of the variable in the location  **store.config.name**
   * @param cast
   *    a function that converts the input field's value to its intended type (e.g. Number, String, ...)
   */
  handleChange = (name, cast) => (event) => {
    if (cast) {
      store.config[name] = cast(event.target.value);
    } else {
      store.config[name] = event.target.value;
    }

    this.setState({ errors: this.validateConfig() });
  };

  handleFinalOrgasmGroupCheck = (name) => (event) => {
    store.config[name] = event.target.value;
    this.setState({ errors: this.validateConfig() });
  };

  handleFinalOrgasmGroupCheckChange = (name) => (event, checked) => {
    store.config[name] = checked;

    const {
      config: {
        finalOrgasmAllowed,
        finalOrgasmDenied,
        finalOrgasmRuined,
        finalOrgasmRandom,
      },
    } = store;

    if (finalOrgasmRandom) {
      let options = [];
      if (finalOrgasmAllowed) {
        options.push("allowedProbability");
      } else {
        store.config.allowedProbability = 0;
      }
      if (finalOrgasmDenied) {
        options.push("deniedProbability");
      } else {
        store.config.deniedProbability = 0;
      }
      if (finalOrgasmRuined) {
        options.push("ruinedProbability");
      } else {
        store.config.ruinedProbability = 0;
      }
      // equalize share of options for initial display
      let sum = 0;
      for (let i = 1; i < options.length; i++) {
        let o = options[i];
        store.config[o] = Math.floor(ONE_HUNDRED_PERCENT / options.length);
        sum += store.config[o];
      }
      store.config[options[0]] = ONE_HUNDRED_PERCENT - sum;
    } else {
      if (finalOrgasmAllowed) {
        store.config.allowedProbability = ONE_HUNDRED_PERCENT;
        store.config.deniedProbability = 0;
        store.config.ruinedProbability = 0;
      } else if (finalOrgasmDenied) {
        store.config.allowedProbability = 0;
        store.config.deniedProbability = ONE_HUNDRED_PERCENT;
        store.config.ruinedProbability = 0;
      } else if (finalOrgasmRuined) {
        store.config.allowedProbability = 0;
        store.config.deniedProbability = 0;
        store.config.ruinedProbability = ONE_HUNDRED_PERCENT;
      }
    }

    this.setState({ errors: this.validateConfig() });
  };

  handleCheckChange = (name) => (event, checked) => {
    store.config[name] = checked;
    this.setState({ errors: this.validateConfig() });
  };

  handleTaskRandomize =
    (except = []) =>
    (event) => {
      event.stopPropagation();

      Object.keys(store.config.tasks).forEach((task) => {
        if (!except.includes(task)) {
          store.config.tasks[task] = getRandomBoolean();
        }
      });
    };

  render() {
    const { classes } = this.props;
    const { errors, exception, tags } = this.state;

    return (
      <div className={classes.background}>
        <div className={classes.formContainer}>
          <Paper elevation={10} className={classes.form}>
            <Group title="Media">
              <Grid container>
                <Grid item xs={12}>
                  <FormControl
                    className={classes.control}
                    required
                    error={!!errors.mediaSource || !!errors.redditId}
                  >
                    <InputLabel>Subreddits</InputLabel>
                    <Input
                      id="redditId"
                      required
                      value={store.config.redditId}
                      onChange={this.handleChange("redditId")}
                    />
                    {errors.mediaSource || errors.redditId ? (
                      <FormHelperText>
                        {errors.mediaSource || errors.redditId}
                      </FormHelperText>
                    ) : (
                      <FormHelperText>
                        You can add multiple subreddits each seperated by a
                        comma
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    className={classes.control}
                    required
                    error={!!errors.slideDuration}
                  >
                    <InputLabel>Slide Duration</InputLabel>
                    <Input
                      id="slideDuration"
                      value={store.config.slideDuration}
                      onChange={this.handleChange("slideDuration", Number)}
                      type="number"
                      inputProps={{ step: "1", min: "3" }}
                      endAdornment={
                        <InputAdornment position="end">seconds</InputAdornment>
                      }
                    />
                    {errors.slideDuration ? (
                      <FormHelperText>{errors.slideDuration}</FormHelperText>
                    ) : (
                      <FormHelperText>
                        Applies to static images and gifs
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    component="fieldset"
                    required
                    error={!!errors.imageType}
                  >
                    <FormLabel component="legend">Media Type</FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={store.config.gifs}
                            onChange={this.handleCheckChange("gifs")}
                            value="gifs"
                          />
                        }
                        label="Gifs"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={store.config.pictures}
                            onChange={this.handleCheckChange("pictures")}
                            value="pictures"
                          />
                        }
                        label="Pictures"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={store.config.videos}
                            onChange={this.handleCheckChange("videos")}
                            value="videos"
                          />
                        }
                        label="Videos"
                      />
                    </FormGroup>
                    <FormHelperText>{errors.imageType}</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </Group>
            <Group title="Time">
              <Grid container spacing={10}>
                <Grid item xs={12} md={6}>
                  <FormControl
                    className={classes.control}
                    required
                    error={!!errors.minimumGameTime}
                  >
                    <InputLabel>Minimum Game Time</InputLabel>
                    <Input
                      id="minimumGameTime"
                      value={store.config.minimumGameTime}
                      required
                      onChange={this.handleChange("minimumGameTime", Number)}
                      type="number"
                      inputProps={{ step: "1", min: "1" }}
                      endAdornment={
                        <InputAdornment position="end">minutes</InputAdornment>
                      }
                    />
                    <FormHelperText>{errors.minimumGameTime}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl
                    className={classes.control}
                    required
                    error={!!errors.maximumGameTime}
                  >
                    <InputLabel>Maximum Game Time</InputLabel>
                    <Input
                      id="maximumGameTime"
                      value={store.config.maximumGameTime}
                      required
                      onChange={this.handleChange("maximumGameTime", Number)}
                      type="number"
                      inputProps={{ step: "1", min: "2" }}
                      endAdornment={
                        <InputAdornment position="end">minutes</InputAdornment>
                      }
                    />
                    {errors.maximumGameTime ? (
                      <FormHelperText>{errors.maximumGameTime}</FormHelperText>
                    ) : (
                      <FormHelperText>
                        Just an estimate, other config options may impact this
                        setting
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            </Group>
            <Group title="Orgasm">
              <Grid container spacing={10}>
                <Grid item xs={12} md={6}>
                  <FormControl
                    component="fieldset"
                    required
                    error={!!errors.finialOrgasm || !!errors.finalOrgasmRandom}
                  >
                    <FormLabel component="legend">Final Orgasm</FormLabel>
                    <Grid container direction="row" alignItems="center">
                      <Grid container direction="column">
                        <Grid item>
                          <FormControlLabel
                            title={
                              "Whether you will be allowed to have a full orgasm in the end"
                            }
                            control={
                              <Switch
                                checked={store.config.finalOrgasmAllowed}
                                onChange={this.handleFinalOrgasmGroupCheckChange(
                                  "finalOrgasmAllowed"
                                )}
                                value="finalOrgasmAllowed"
                              />
                            }
                            label="Allowed"
                          />
                        </Grid>
                        <Grid item xs={10}>
                          <FormControl
                            className={classes.control}
                            required={!!store.config.finalOrgasmRandom}
                            error={
                              !!errors.allowedProbability ||
                              (!!store.config.finalOrgasmRandom &&
                                !!errors.finialOrgasm)
                            }
                          >
                            <InputLabel>Probability</InputLabel>
                            <Input
                              id="allowedProbability"
                              value={store.config.allowedProbability}
                              onChange={this.handleFinalOrgasmGroupCheck(
                                "allowedProbability"
                              )}
                              disabled={
                                !store.config.finalOrgasmRandom ||
                                !store.config.finalOrgasmAllowed
                              }
                              endAdornment={
                                <InputAdornment position="end">
                                  %
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                          <FormHelperText>
                            {errors.allowedProbability}
                          </FormHelperText>
                        </Grid>
                      </Grid>
                      <Grid container direction={"column"}>
                        <Grid item xs={10}>
                          <FormControlLabel
                            title={"Whether you will be denied in the end"}
                            control={
                              <Switch
                                checked={store.config.finalOrgasmDenied}
                                onChange={this.handleFinalOrgasmGroupCheckChange(
                                  "finalOrgasmDenied"
                                )}
                                value="finalOrgasmDenied"
                              />
                            }
                            label="Denied"
                          />
                        </Grid>
                        <Grid item xs={10}>
                          <FormControl
                            className={classes.control}
                            required={!!store.config.finalOrgasmRandom}
                            error={
                              !!errors.deniedProbability ||
                              (!!store.config.finalOrgasmRandom &&
                                !!errors.finialOrgasm)
                            }
                          >
                            <InputLabel>Probability</InputLabel>
                            <Input
                              id="deniedProbability"
                              value={store.config.deniedProbability}
                              onChange={this.handleFinalOrgasmGroupCheck(
                                "deniedProbability"
                              )}
                              disabled={
                                !store.config.finalOrgasmRandom ||
                                !store.config.finalOrgasmDenied
                              }
                              endAdornment={
                                <InputAdornment position="end">
                                  %
                                </InputAdornment>
                              }
                            />
                            <FormHelperText>
                              {errors.deniedProbability}
                            </FormHelperText>
                          </FormControl>
                        </Grid>
                      </Grid>
                      <Grid container direction={"column"}>
                        <Grid item xs={10}>
                          <FormControlLabel
                            title={
                              "Whether you will be asked to ruin in the end"
                            }
                            control={
                              <Switch
                                checked={store.config.finalOrgasmRuined}
                                onChange={this.handleFinalOrgasmGroupCheckChange(
                                  "finalOrgasmRuined"
                                )}
                                value="finalOrgasmRuined"
                              />
                            }
                            label="Ruined"
                          />
                        </Grid>
                        <Grid item xs={10}>
                          <FormControl
                            className={classes.control}
                            required={!!store.config.finalOrgasmRandom}
                            error={
                              !!errors.ruinedProbability ||
                              (!!store.config.finalOrgasmRandom &&
                                !!errors.finialOrgasm)
                            }
                          >
                            <InputLabel>Probability</InputLabel>
                            <Input
                              id="ruinedProbability"
                              value={store.config.ruinedProbability}
                              onChange={this.handleFinalOrgasmGroupCheck(
                                "ruinedProbability"
                              )}
                              disabled={
                                !store.config.finalOrgasmRandom ||
                                !store.config.finalOrgasmRuined
                              }
                              endAdornment={
                                <InputAdornment position="end">
                                  %
                                </InputAdornment>
                              }
                            />
                            <FormHelperText>
                              {errors.ruinedProbability}
                            </FormHelperText>
                          </FormControl>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <FormControlLabel
                          title={
                            "Chooses at random from the left hand side selected game ends"
                          }
                          control={
                            <Switch
                              checked={store.config.finalOrgasmRandom}
                              onChange={this.handleFinalOrgasmGroupCheckChange(
                                "finalOrgasmRandom"
                              )}
                              value="finalOrgasmRandom"
                            />
                          }
                          label={"Random (applies to selected)"}
                        />
                      </Grid>
                      {errors.finalOrgasmRandom ? (
                        <FormHelperText>
                          {errors.finalOrgasmRandom}
                        </FormHelperText>
                      ) : (
                        <FormHelperText>{errors.finialOrgasm}</FormHelperText>
                      )}
                    </Grid>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={10}>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={store.config.postOrgasmTorture}
                        onChange={this.handleCheckChange("postOrgasmTorture")}
                        value="postOrgasmTorture"
                      />
                    }
                    label="Post Orgasm Torture"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl
                    className={classes.control}
                    disabled={!store.config.postOrgasmTorture}
                    error={!!errors.postOrgasmTortureMinimumTime}
                  >
                    <InputLabel>Post Orgasm Torture Minimum Time</InputLabel>
                    <Input
                      id="postOrgasmTortureMinimumTime"
                      value={store.config.postOrgasmTortureMinimumTime}
                      onChange={this.handleChange(
                        "postOrgasmTortureMinimumTime",
                        Number
                      )}
                      fullWidth
                      type="number"
                      inputProps={{ step: "1", min: "3" }}
                      endAdornment={
                        <InputAdornment position="end">seconds</InputAdornment>
                      }
                    />
                    <FormHelperText>
                      {errors.postOrgasmTortureMinimumTime}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl
                    className={classes.control}
                    disabled={!store.config.postOrgasmTorture}
                    error={!!errors.postOrgasmTortureMaximumTime}
                  >
                    <InputLabel>Post Orgasm Torture Maximum Time</InputLabel>
                    <Input
                      id="postOrgasmTortureMaximumTime"
                      value={store.config.postOrgasmTortureMaximumTime}
                      onChange={this.handleChange(
                        "postOrgasmTortureMaximumTime",
                        Number
                      )}
                      fullWidth
                      type="number"
                      inputProps={{ step: "1", min: "5" }}
                      endAdornment={
                        <InputAdornment position="end">seconds</InputAdornment>
                      }
                    />
                    <FormHelperText>
                      {errors.postOrgasmTortureMaximumTime}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl
                    title={
                      "specify a number of ruins you will have to reach before the Game End"
                    }
                    className={classes.control}
                    error={!!errors.minimumRuinedOrgasms}
                  >
                    <InputLabel>Minimum additional Ruined Orgasms</InputLabel>
                    <Input
                      id="minimumRuinedOrgasms"
                      value={store.config.minimumRuinedOrgasms}
                      onChange={this.handleChange(
                        "minimumRuinedOrgasms",
                        Number
                      )}
                      fullWidth
                      type="number"
                      inputProps={{ step: "1", min: "0" }}
                    />
                    <FormHelperText>
                      {errors.minimumRuinedOrgasms}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl
                    title={
                      "specify a number of ruins you may have to reach before the Game End"
                    }
                    className={classes.control}
                    error={!!errors.maximumRuinedOrgasms}
                  >
                    <InputLabel>Maximum Ruined Orgasms</InputLabel>
                    <Input
                      id="maximumRuinedOrgasms"
                      value={store.config.maximumRuinedOrgasms}
                      onChange={this.handleChange(
                        "maximumRuinedOrgasms",
                        Number
                      )}
                      fullWidth
                      type="number"
                      inputProps={{ step: "1", min: "0" }}
                    />
                    <FormHelperText>
                      {errors.maximumRuinedOrgasms}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl
                    className={classes.control}
                    error={!!errors.ruinCooldown}
                  >
                    <InputLabel>Ruin Cooldown</InputLabel>
                    <Input
                      id="ruinCooldown"
                      value={store.config.ruinCooldown}
                      onChange={this.handleChange("ruinCooldown", Number)}
                      fullWidth
                      type="number"
                      inputProps={{ step: "1", min: "0" }}
                      endAdornment={
                        <InputAdornment position="end">seconds</InputAdornment>
                      }
                    />
                    <FormHelperText>{errors.ruinCooldown}</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </Group>
            <Group title="Edging">
              <Grid container spacing={10}>
                <Grid item xs={12} md={3}>
                  <FormControl
                    className={classes.control}
                    error={!!errors.minimumEdges}
                    title={
                      "Specify how many edges you will have to fulfill before the game may end"
                    }
                  >
                    <InputLabel>Minimum Edges</InputLabel>
                    <Input
                      id="minimumEdges"
                      value={store.config.minimumEdges}
                      onChange={this.handleChange("minimumEdges", Number)}
                      fullWidth
                      type="number"
                      inputProps={{ step: "1", min: "0" }}
                    />
                    <FormHelperText>{errors.minimumEdges}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl
                    className={classes.control}
                    error={!!errors.edgeCooldown}
                  >
                    <InputLabel>Edge Cooldown</InputLabel>
                    <Input
                      id="edgeCooldown"
                      value={store.config.edgeCooldown}
                      onChange={this.handleChange("edgeCooldown", Number)}
                      fullWidth
                      type="number"
                      inputProps={{ step: "1", min: "0" }}
                      endAdornment={
                        <InputAdornment position="end">seconds</InputAdornment>
                      }
                    />
                    <FormHelperText>{errors.edgeCooldown}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl
                    className={classes.control}
                    error={!!errors.edgeFrequency}
                  >
                    <InputLabel>Increase Edge Frequency</InputLabel>
                    <Input
                      id="edgeFrequency"
                      value={store.config.edgeFrequency}
                      onChange={this.handleChange("edgeFrequency", Number)}
                      fullWidth
                      type="number"
                      inputProps={{ step: "1", min: "0" }}
                      endAdornment={
                        <InputAdornment position="end">%</InputAdornment>
                      }
                    />
                    <FormHelperText>{errors.edgeFrequency}</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </Group>
            <Group title="Stroke">
              <Grid container spacing={10}>
                <Grid item xs={12} md={3}>
                  {/* <FormControl
                    className={classes.control}
                    error={!!errors.defaultStrokeStyle}
                    title={
                      "Select the most occurring stroke style during this game. Only active Stroke Styles " +
                      "can be chosen. 'Hands Off' can not be chosen."
                    }
                  >
                    <InputLabel>Default Stroke Style</InputLabel>
                    <Select
                      value={store.config.defaultStrokeStyle}
                      onChange={this.handleChange("defaultStrokeStyle", Number)}
                    >
                      {StrokeStyles.entries(([strokeStyle, config]) => (
                        <MenuItem
                          key={strokeStyle}
                          value={config.label}
                          disabled={
                            !store.config.tasks[key] || key === "handsOff"
                          }
                        >
                          {StrokeStyleString[StrokeStyleEnum[key]]}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{errors.defaultStrokeStyle}</FormHelperText>
                  </FormControl> */}
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl className={classes.control}>
                    <InputLabel>Initial Grip Strength</InputLabel>
                    <Select
                      value={store.config.initialGripStrength}
                      onChange={this.handleChange(
                        "initialGripStrength",
                        Number
                      )}
                    >
                      <MenuItem value={GripStrength.BarelyTouching}>
                        {GripStrengthString[GripStrength.BarelyTouching]}
                      </MenuItem>
                      <MenuItem value={GripStrength.VeryLight}>
                        {GripStrengthString[GripStrength.VeryLight]}
                      </MenuItem>
                      <MenuItem value={GripStrength.Light}>
                        {GripStrengthString[GripStrength.Light]}
                      </MenuItem>
                      <MenuItem value={GripStrength.Normal}>
                        {GripStrengthString[GripStrength.Normal]}
                      </MenuItem>
                      <MenuItem value={GripStrength.Tight}>
                        {GripStrengthString[GripStrength.Tight]}
                      </MenuItem>
                      <MenuItem value={GripStrength.VeryTight}>
                        {GripStrengthString[GripStrength.VeryTight]}
                      </MenuItem>
                      <MenuItem value={GripStrength.DeathGrip}>
                        {GripStrengthString[GripStrength.DeathGrip]}
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl
                    className={classes.control}
                    error={!!errors.slowestStrokeSpeed}
                  >
                    <InputLabel>Slowest Stroke Speed</InputLabel>
                    <Input
                      id="slowestStrokeSpeed"
                      value={store.config.slowestStrokeSpeed}
                      onChange={this.handleChange("slowestStrokeSpeed", Number)}
                      fullWidth
                      type="number"
                      inputProps={{ step: "0.25", min: "0.25", max: "6" }}
                      endAdornment={
                        <InputAdornment position="end">seconds</InputAdornment>
                      }
                    />
                    <FormHelperText>{errors.slowestStrokeSpeed}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl
                    className={classes.control}
                    error={!!errors.fastestStrokeSpeed}
                  >
                    <InputLabel>Fastest Stroke Speed</InputLabel>
                    <Input
                      id="fastestStrokeSpeed"
                      value={store.config.fastestStrokeSpeed}
                      onChange={this.handleChange("fastestStrokeSpeed", Number)}
                      fullWidth
                      type="number"
                      inputProps={{ step: "0.25", min: "0.25", max: "6" }}
                      endAdornment={
                        <InputAdornment position="end">seconds</InputAdornment>
                      }
                    />
                    <FormHelperText>{errors.fastestStrokeSpeed}</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </Group>
            <Group title="Tasks">
              <Accordion elevation={2} defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  title={"Chooses from all options below at random."}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={this.handleTaskRandomize()}
                    // onClick={this.handleTaskRandomize([
                    //   getStrokeStyleName(store.config.defaultStrokeStyle),
                    // ])}
                  >
                    Randomize
                  </Button>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container>
                    <Grid item xs={12} sm={6} md={4}>
                      <FormControl
                        className={classes.control}
                        error={!!errors.speed}
                      >
                        <TaskList
                          title="Speed"
                          error={errors.speed}
                          tasks={{
                            doubleStrokes: "Double Strokes",
                            halvedStrokes: "Halved Strokes",
                            teasingStrokes: "Teasing Strokes",
                            accelerationCycles: "Acceleration Cycles",
                            randomBeat: "Random Beats",
                            randomStrokeSpeed: "Random Stroke Speed",
                            redLightGreenLight: "Red Light Green Light",
                            clusterStrokes: "Cluster Strokes",
                            gripChallenge: "Grip Challenge",
                          }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <FormControl
                        className={classes.button}
                        error={!!errors.style}
                        title={
                          "Select the Stroking Styles that shall appear during the game here. \n" +
                          "At least the default Stroke Style has to be active. \n" +
                          "You can change the default Stroke Style above. Only active Styles can be chosen."
                        }
                      >
                        <TaskList
                          title="Style"
                          error={errors.style}
                          // except={[
                          //   getStrokeStyleName(store.config.defaultStrokeStyle),
                          // ]}
                          tasks={{
                            dominant: "Dominant",
                            nondominant: "Nondominant",
                            headOnly: "Head Only",
                            shaftOnly: "Shaft Only",
                            gripAdjustments: "Grip Adjustments",
                            overhandGrip: "Overhand Grip",
                            bothHands: "Both Hands",
                            handsOff: "Hands Off",
                          }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TaskList
                        title="Cock & Ball Torture"
                        tasks={{
                          bindCockBalls: "Bind Cock and Balls",
                          rubberBands: "Rubber Bands",
                          clothespins: "Clothespins",
                          headPalming: "Head Palming",
                          icyHot: "Icy Hot",
                          toothpaste: "Toothpaste",
                          ballSlaps: "Ball Slaps",
                          squeezeBalls: "Squeeze Balls",
                          breathPlay: "Breath Play",
                          scratching: "Scratching",
                          flicking: "Flicking",
                          cbtIce: "Icecubes",
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TaskList
                        title="Cum Eating"
                        tasks={{
                          precum: "Precum",
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TaskList
                        title="Anal"
                        tasks={{
                          buttplug: "Butt Plug",
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TaskList
                        title="Misc."
                        tasks={{
                          rubNipples: "Rub Nipples",
                          nipplesAndStroke: "Nipples and Stroking",
                        }}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Group>
            <Button
              title={"Starts the game."}
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.handleStartGame}
              disabled={Object.keys(errors).length > 0}
            >
              Start
            </Button>
            <ShareGame disabled={Object.keys(errors).length > 0} tags={tags} />
            {exception && (
              <div style={{ marginTop: 10 }}>
                <Alert severity="error">{exception.message}</Alert>
              </div>
            )}
          </Paper>
        </div>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(ConfigPage));
