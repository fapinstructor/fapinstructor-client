import {
  Switch,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@material-ui/core";
import Task from "../Task";
import Hash from "common/types/Hash";

type TaskGroupProps = {
  label: string;
  tasks: Hash<string>;
  selectedTasks?: string[];
  onToggleTask: (id: string) => void;
  onToggleAllTasks: (tasks: string[], toggle: boolean) => void;
};

export default function TaskGroup({
  label,
  tasks,
  selectedTasks,
  onToggleTask,
  onToggleAllTasks,
}: TaskGroupProps) {
  const availableTasks = Object.keys(tasks);
  const allTasksSelected = availableTasks.length === selectedTasks?.length;

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={allTasksSelected}
              onChange={() =>
                onToggleAllTasks(availableTasks, !allTasksSelected)
              }
            />
          }
          label="Toggle All"
        />
        {Object.entries(tasks).map(([id, label]) => (
          <Task
            key={id}
            id={id}
            label={label}
            checked={Boolean(selectedTasks?.includes(id))}
            onToggleTask={onToggleTask}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}
