import * as React from "react";
import { getRandomBoolean } from "utils/math";
import store from "store";
import { withStyles } from "@material-ui/core/styles";
import { Button, Paper } from "@material-ui/core";
import { withRouter } from "react-router-dom";

import Footer from "components/organisms/Footer";
import ShareGame from "components/organisms/ShareGame";
import { validSubreddit } from "utils/regex";
import BackgroundImage from "images/background.jpg";
import TaskStep from "./components/Form/TaskStep";
import { ProxyStoreConsumer } from "containers/StoreProvider";
import MediaStep from "./components/Form/MediaStep";
import OrgasmStep from "./components/Form/OrgasmStep";
import EdgingStep from "./components/Form/EdgingStep";
import StrokeStep from "./components/Form/StrokeStep";
import TimeStep from "./components/Form/TimeStep";

import { defaultConfig } from "configureStore";

const ONE_HUNDRED_PERCENT = 100; // Maximum Percentage that Can be achieved

const styles = (theme) => ({
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
});

class ConfigPage extends React.Component {
  state = {
    config: null,
    errors: {},
  };

  componentDidMount() {
    let config;

    if (store.config.isDefaultConfig) {
      delete store.config.isDefaultConfig;
      config = { ...defaultConfig };
    } else {
      config = store.config;
    }

    this.setState({
      config,
    });
  }

  handleStartGame = () => {
    store.config = this.state.config;
    this.props.history.push("/game");
  };

  validateConfig = () => {
    const errors = {};

    for (let name in this.state.config) {
      let value = this.state.config[name];
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
            !this.state.config.gifs &&
            !this.state.config.pictures &&
            !this.state.config.videos
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
          if (!value || this.state.config.minimumGameTime < 1) {
            errors["minimumGameTime"] =
              "Minimum Game Time must be at least 1 minutes";
          }
          if (!value || value < 2) {
            errors["maximumGameTime"] =
              "Maximum Game Time must be at least 2 minutes";
          }
          if (
            parseInt(this.state.config.maximumGameTime, 10) <
            parseInt(this.state.config.minimumGameTime, 10)
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
          delete errors.finalOrgasm;
          if (
            !this.state.config.finalOrgasmAllowed &&
            !this.state.config.finalOrgasmDenied &&
            !this.state.config.finalOrgasmRuined
          ) {
            errors.finalOrgasm = "Must select at least one value";
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
          const { allowedProbability, deniedProbability, ruinedProbability } =
            this.state.config;
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
          if (
            value < parseInt(this.state.config.postOrgasmTortureMinimumTime, 10)
          ) {
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
            parseInt(this.state.config.minimumRuinedOrgasms, 10)
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
          if (isNaN(value) || value < 0.1) {
            errors[name] = "Cannot be less than 0.1";
          }
          if (value > 8) {
            errors[name] = "Cannot be greater than 8";
          }
          break;
        }
        case "fastestStrokeSpeed": {
          delete errors[name];
          if (isNaN(value) || value < this.state.config.slowestStrokeSpeed) {
            errors[name] = "Cannot be less than the slowest stroke speed";
          }
          if (value > 8) {
            errors[name] = "Cannot be greater than 8";
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
   *    the name of the variable in the location  **config.name**
   * @param cast
   *    a function that converts the input field's value to its intended type (e.g. Number, String, ...)
   */
  handleChange = (name, cast) => (event) => {
    this.setState(
      {
        config: {
          ...this.state.config,
          [name]: cast ? cast(event.target.value) : event.target.value,
        },
      },
      () => {
        this.setState({
          errors: this.validateConfig(),
        });
      }
    );
  };

  handleFinalOrgasmGroupCheck = (name) => (event) => {
    this.setState(
      {
        config: { ...this.state.config, [name]: event.target.value },
      },
      () => {
        this.setState({
          errors: this.validateConfig(),
        });
      }
    );
  };

  handleFinalOrgasmGroupCheckChange = (name) => (event, checked) => {
    const config = { ...this.state.config };
    config[name] = checked;

    const {
      finalOrgasmAllowed,
      finalOrgasmDenied,
      finalOrgasmRuined,
      finalOrgasmRandom,
    } = config;

    if (finalOrgasmRandom) {
      let options = [];
      if (finalOrgasmAllowed) {
        options.push("allowedProbability");
      } else {
        config.allowedProbability = 0;
      }
      if (finalOrgasmDenied) {
        options.push("deniedProbability");
      } else {
        config.deniedProbability = 0;
      }
      if (finalOrgasmRuined) {
        options.push("ruinedProbability");
      } else {
        config.ruinedProbability = 0;
      }
      // equalize share of options for initial display
      let sum = 0;
      for (let i = 1; i < options.length; i++) {
        let o = options[i];
        config[o] = Math.floor(ONE_HUNDRED_PERCENT / options.length);
        sum += config[o];
      }
      config[options[0]] = ONE_HUNDRED_PERCENT - sum;
    } else {
      if (finalOrgasmAllowed) {
        config.allowedProbability = ONE_HUNDRED_PERCENT;
        config.deniedProbability = 0;
        config.ruinedProbability = 0;
      } else if (finalOrgasmDenied) {
        config.allowedProbability = 0;
        config.deniedProbability = ONE_HUNDRED_PERCENT;
        config.ruinedProbability = 0;
      } else if (finalOrgasmRuined) {
        config.allowedProbability = 0;
        config.deniedProbability = 0;
        config.ruinedProbability = ONE_HUNDRED_PERCENT;
      }
    }

    this.setState({ config }, () => {
      this.setState({
        errors: this.validateConfig(),
      });
    });
  };

  handleCheckChange = (name) => (event, checked) => {
    this.setState(
      {
        config: { ...this.state.config, [name]: checked },
      },
      () => {
        this.setState({
          errors: this.validateConfig(),
        });
      }
    );
  };

  handleToggleTask = (toggledTask) => {
    this.setState({
      config: {
        ...this.state.config,
        tasks: {
          ...this.state.config.tasks,
          [toggledTask]: !this.state.config.tasks[toggledTask],
        },
      },
    });
  };

  handleToggleAllTasks = (tasks, toggle) => {
    const toggledTasks = tasks.reduce(
      (result, task) => ({
        ...result,
        [task]: toggle,
      }),
      this.state.config.tasks
    );

    this.setState({
      config: {
        ...this.state.config,
        tasks: toggledTasks,
      },
    });
  };

  handleRandomizeTasks = () => {
    const tasks = Object.keys(this.state.config.tasks).reduce(
      (result, task) => ({
        ...result,
        [task]: getRandomBoolean(),
      }),
      {}
    );

    this.setState({
      config: {
        ...this.state.config,
        tasks,
      },
    });
  };

  render() {
    const { classes } = this.props;
    const { errors } = this.state;

    if (!this.state.config) {
      return <div>Loading...</div>;
    }

    return (
      <ProxyStoreConsumer>
        {() => (
          <div className={classes.background}>
            <div className={classes.formContainer}>
              <Paper elevation={10} className={classes.form}>
                <MediaStep
                  values={this.state.config}
                  errors={errors}
                  handleChange={this.handleChange}
                  handleCheckChange={this.handleCheckChange}
                />
                <TimeStep
                  values={this.state.config}
                  errors={errors}
                  handleChange={this.handleChange}
                />
                <OrgasmStep
                  values={this.state.config}
                  errors={errors}
                  handleChange={this.handleChange}
                  handleCheckChange={this.handleCheckChange}
                  handleFinalOrgasmGroupCheck={this.handleFinalOrgasmGroupCheck}
                  handleFinalOrgasmGroupCheckChange={
                    this.handleFinalOrgasmGroupCheckChange
                  }
                />
                <EdgingStep
                  values={this.state.config}
                  errors={errors}
                  handleChange={this.handleChange}
                />
                <StrokeStep
                  values={this.state.config}
                  errors={errors}
                  handleChange={this.handleChange}
                />
                <TaskStep
                  values={this.state.config}
                  handleToggleTask={this.handleToggleTask}
                  handleToggleAllTasks={this.handleToggleAllTasks}
                  handleRandomizeTasks={this.handleRandomizeTasks}
                />
                <Button
                  title="Starts the game."
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={this.handleStartGame}
                  disabled={Object.keys(errors).length > 0}
                >
                  Start
                </Button>
                <ShareGame disabled={Object.keys(errors).length > 0} />
                <Footer />
              </Paper>
            </div>
          </div>
        )}
      </ProxyStoreConsumer>
    );
  }
}

export default withRouter(withStyles(styles)(ConfigPage));
