import { Field } from "formik";
import { FormControl, FormLabel, Grid } from "@material-ui/core";
import { ToggleButton } from "@material-ui/lab";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";

import { FormikSlider } from "@/components/Form";

const marks = [
  { value: 1, label: "0%" },
  { value: 50, label: "50%" },
  { value: 100, label: "100%" },
];

function getValueLabelFormat(value: number) {
  return `${value}%`;
}

type ProbabilityFieldProps = {
  name: string;
  label: string;
  cap?: number;
  disabled?: boolean;
  onChange: (name: string, value: number) => void;
  locked: boolean;
  onToggleLock: (name: string, locked: boolean) => void;
};

export default function ProbabilityField({
  name,
  label,
  cap,
  disabled = false,
  onChange,
  locked = false,
  onToggleLock,
}: ProbabilityFieldProps) {
  return (
    <FormControl fullWidth>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormLabel id={name}>{label}</FormLabel>
        </Grid>
        <Grid item>
          <ToggleButton
            size="small"
            aria-label={locked ? "Locked" : "Unlocked"}
            selected={locked}
            value={locked}
            onChange={() => {
              onToggleLock(name, !locked);
            }}
          >
            {locked ? (
              <LockIcon color="secondary" />
            ) : (
              <LockOpenIcon color="secondary" />
            )}
          </ToggleButton>
        </Grid>
        <Grid item xs>
          <Field
            name={name}
            aria-labelledby={name}
            getAriaValueText={getValueLabelFormat}
            valueLabelFormat={getValueLabelFormat}
            component={FormikSlider}
            marks={marks}
            min={0}
            max={100}
            cap={cap}
            valueLabelDisplay="auto"
            onChange={onChange}
            disabled={locked || disabled}
          />
        </Grid>
      </Grid>
    </FormControl>
  );
}
