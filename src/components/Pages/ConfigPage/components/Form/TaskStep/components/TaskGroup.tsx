import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Checkbox,
  Typography,
} from "@material-ui/core";
import styled from "styled-components/macro";
import { Field, useFormikContext } from "formik";
import { CheckboxWithLabel } from "formik-material-ui";

import Hash from "common/types/Hash";
import { GameConfig } from "configureStore";
import theme from "theme";

type TaskGroupProps = {
  label: string;
  tasks: Hash<string>;
};

const TaskList = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media screen and (${theme.breakpoint.mobile.up}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export default function TaskGroup({ label, tasks }: TaskGroupProps) {
  const form = useFormikContext<GameConfig>();

  const availableTasks = Object.keys(tasks);

  const selectedTasks = Object.entries(form.values.tasks)
    .filter(([key]) => availableTasks.includes(key))
    .filter(([_, value]) => value);

  const allTasksSelected = availableTasks.length === selectedTasks?.length;

  function toggleAllTasks() {
    availableTasks.forEach((task) => {
      form.setFieldValue(`tasks.${task}`, !allTasksSelected, false);
    });
  }

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">
        <Typography color="secondary">{label}</Typography>
      </FormLabel>
      <FormGroup>
        <TaskList>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={allTasksSelected}
                onChange={toggleAllTasks}
              />
            }
            label="Select All"
          />
          {Object.entries(tasks).map(([id, label]) => (
            <Field
              key={id}
              component={CheckboxWithLabel}
              type="checkbox"
              name={`tasks.${id}`}
              Label={{ label }}
            />
          ))}
        </TaskList>
      </FormGroup>
    </FormControl>
  );
}
