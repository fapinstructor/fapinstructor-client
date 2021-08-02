import { Component } from "react";
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
import Task from "./Task";

/**
 * Implements advanced Button-List stuff.
 */
class TaskList extends Component {
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
      <ProxyStoreConsumer>
        {({ config }) => (
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
              {Object.entries(tasks).map(([id, label]) => (
                <Task
                  id={id}
                  label={label}
                  checked={config.tasks[id]}
                  onTaskToggle={this.handleTaskCheck}
                  disabled={except.includes(id)}
                />
              ))}
            </FormGroup>
            <FormHelperText>{errorMessage}</FormHelperText>
          </FormControl>
        )}
      </ProxyStoreConsumer>
    );
  }
}

export default TaskList;
