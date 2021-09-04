import { Field } from "formik";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
} from "@material-ui/core";
import ScheduleIcon from "@material-ui/icons/Schedule";

import FormikSlider from "components/molecules/fields/FormikSlider";

const marks = [
  { value: 0.25, label: "0.25" },
  { value: 2, label: "2" },
  { value: 4, label: "4" },
  { value: 6, label: "6" },
  { value: 8, label: "8" },
];

function getAriaValueText(value: number) {
  return `${value} strokes per second`;
}

function getValueLabelFormat(value: number) {
  return `${value}`;
}

export default function StrokeSpeedField() {
  return (
    <FormControl fullWidth>
      <FormLabel id="stroke-speed">Stroke Speed</FormLabel>
      <Grid container spacing={2}>
        <Grid item>
          <ScheduleIcon />
        </Grid>
        <Grid item xs>
          <Field
            name="strokeSpeed"
            aria-labelledby="stroke-speed"
            getAriaValueText={getAriaValueText}
            valueLabelFormat={getValueLabelFormat}
            component={FormikSlider}
            marks={marks}
            min={0.25}
            max={8}
            step={0.25}
            valueLabelDisplay="auto"
            parse={({ min, max }: { min: number; max: number }) => [min, max]}
            format={([min, max]: [number, number]) => ({
              min,
              max,
            })}
          />
        </Grid>
      </Grid>
      <FormHelperText>
        The minimum and maximum number of strokes per second.
      </FormHelperText>
    </FormControl>
  );
}
