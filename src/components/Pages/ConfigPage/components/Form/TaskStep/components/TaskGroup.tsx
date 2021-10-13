import { FormControlLabel, Checkbox, Typography } from "@material-ui/core";
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

  const selectedTasks = form.values.tasks.filter((task) =>
    availableTasks.includes(task)
  );

  const allTasksSelected = availableTasks.length === selectedTasks?.length;

  function toggleAllTasks() {
    // Get all other selected tasks
    const otherTasks = form.values.tasks.filter(
      (task) => !availableTasks.includes(task)
    );

    if (!allTasksSelected) {
      form.setFieldValue("tasks", [...otherTasks, ...availableTasks], false);
    } else {
      form.setFieldValue("tasks", otherTasks, false);
    }
  }

  return (
    <fieldset>
      <legend>
        <Typography color="secondary" component="span">
          {label}
        </Typography>
      </legend>
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
            name="tasks"
            value={id}
            Label={{ label }}
          />
        ))}
      </TaskList>
    </fieldset>
  );
}
