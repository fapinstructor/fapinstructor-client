import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Checkbox,
} from "@material-ui/core";
import Hash from "common/types/Hash";
import { Field, useFormikContext } from "formik";
import { CheckboxWithLabel } from "formik-material-ui";
import { TaskConfig } from "configureStore";

type TaskGroupProps = {
  label: string;
  tasks: Hash<string>;
};

export default function TaskGroup({ label, tasks }: TaskGroupProps) {
  // TODO: Use form type
  const form = useFormikContext<{
    tasks: TaskConfig;
  }>();

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
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox checked={allTasksSelected} onChange={toggleAllTasks} />
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
      </FormGroup>
    </FormControl>
  );
}
