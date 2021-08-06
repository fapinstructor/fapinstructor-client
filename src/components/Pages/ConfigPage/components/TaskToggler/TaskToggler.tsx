import { Switch, FormControlLabel } from "@material-ui/core";

type TaskProps = {
  id: string;
  label: string;
  checked: boolean;
  onToggleTask: (id: string) => void;
  disabled?: boolean;
};

export default function TaskToggler({
  id,
  label,
  checked,
  onToggleTask,
  disabled = false,
}: TaskProps) {
  return (
    <FormControlLabel
      key={id}
      control={
        <Switch
          disabled={disabled}
          checked={checked}
          onChange={() => onToggleTask(id)}
          value={label}
        />
      }
      label={label}
    />
  );
}
