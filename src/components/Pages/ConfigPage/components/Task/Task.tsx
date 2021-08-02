import { Switch, FormControlLabel } from "@material-ui/core";

type TaskProps = {
  id: string;
  label: string;
  checked: boolean;
  onTaskToggle: (id: string) => void;
  disabled: boolean;
};

export default function Task({
  id,
  label,
  checked,
  onTaskToggle,
  disabled,
}: TaskProps) {
  return (
    <FormControlLabel
      key={id}
      control={
        <Switch
          disabled={disabled}
          checked={checked}
          onChange={() => onTaskToggle(id)}
          value={label}
        />
      }
      label={label}
    />
  );
}
