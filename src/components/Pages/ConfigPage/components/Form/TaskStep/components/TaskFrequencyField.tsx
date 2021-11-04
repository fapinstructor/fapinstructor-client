import { Field } from "formik";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
} from "@material-ui/core";

import FormikSlider from "@/components/molecules/fields/FormikSlider";

const marks = [
  { value: 0, label: "0s" },
  { value: 30, label: "30s" },
  { value: 60, label: "1m" },
  { value: 2 * 60, label: "2m" },
  { value: 3 * 60, label: "3m" },
  { value: 4 * 60, label: "4m" },
  { value: 5 * 60, label: "5m" },
];

function getAriaValueText(value: number) {
  return `${value} seconds`;
}

function getValueLabelFormat(value: number) {
  return `${value}s`;
}

export default function TaskFrequencyField() {
  return (
    <FormControl fullWidth>
      <FormLabel id="task-frequency">Task Frequency</FormLabel>
      <Grid container spacing={2}>
        <Grid item xs>
          <Field
            name="actionFrequency"
            aria-labelledby="task-frequency"
            getAriaValueText={getAriaValueText}
            valueLabelFormat={getValueLabelFormat}
            component={FormikSlider}
            marks={marks}
            min={0}
            max={5 * 60}
            valueLabelDisplay="auto"
          />
        </Grid>
      </Grid>
      <FormHelperText>How often you could be assigned a task.</FormHelperText>
    </FormControl>
  );
}
