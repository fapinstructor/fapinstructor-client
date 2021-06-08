import React from "react";
import PropTypes from "prop-types";
import {
  Switch,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from "@material-ui/core";
import store from "store";
import { ProxyStoreConsumer } from "containers/StoreProvider";

/**
 * Implements advanced Button-List stuff.
 */
class TaskList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleAll: this.shouldToggle(store.config.tasks),
    };
  }

  shouldToggle(tasks) {
    return (
      Object.keys(tasks)
        .filter((task) => Object.keys(this.props.tasks).includes(task))
        .find((task) => !tasks[task]) === undefined
    );
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    tasks: PropTypes.object.isRequired,
    error: PropTypes.string,
    except: PropTypes.array,
  };

  /**
   *
   * @param except
   *   the elements in the except array won't be changed.
   * @returns {Function}
   *   it actually returns a piece of HTML5
   */
  handleToggleAll =
    (except = []) =>
    (event, checked) => {
      this.setState({
        [event.target.value]: checked,
      });
      Object.keys(this.props.tasks).forEach((task) => {
        if (!except.includes(task)) {
          store.config.tasks[task] = checked;
        }
      });
    };

  handleTaskCheck = (name) => (event, checked) => {
    store.config.tasks[name] = checked;

    this.setState({
      toggleAll: this.shouldToggle(store.config.tasks),
    });
  };

  render() {
    const { title, tasks, except = [], error: errorMessage } = this.props;
    const { toggleAll } = this.state;

    return (
      <FormControl component="fieldset" error={!!errorMessage}>
        <FormLabel component="legend">{title}</FormLabel>
        <FormGroup>
          <FormHelperText>{errorMessage}</FormHelperText>
          <FormControlLabel
            control={
              <Switch
                checked={toggleAll}
                onChange={this.handleToggleAll(except)}
                value="toggleAll"
              />
            }
            label="Toggle All"
          />
          {Object.keys(tasks).map((task) => (
            <FormControlLabel
              key={task}
              disabled={except.includes(task)}
              control={
                <ProxyStoreConsumer>
                  {({ config }) => (
                    <Switch
                      checked={config.tasks[task]}
                      onChange={this.handleTaskCheck(task)}
                      value={task}
                    />
                  )}
                </ProxyStoreConsumer>
              }
              label={tasks[task]}
            />
          ))}
        </FormGroup>
        <FormHelperText>{errorMessage}</FormHelperText>
      </FormControl>
    );
  }
}

export default TaskList;
