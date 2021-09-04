import { Field } from "formik";
import { TextField } from "formik-material-ui";
import { FormControl, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ScheduleIcon from "@material-ui/icons/Schedule";

import FormikSlider from "components/molecules/fields/FormikSlider";

const useStyles = makeStyles({
  input: {
    width: 42,
    margin: 0,
  },
});

const marks = [
  { value: 1, label: "1m" },
  { value: 10, label: "10m" },
  { value: 20, label: "20m" },
  { value: 30, label: "30m" },
  { value: 40, label: "40m" },
  { value: 50, label: "50m" },
  { value: 60, label: "60m" },
];

function getAriaValueText(value: number) {
  return `${value} minutes`;
}

function getValueLabelFormat(value: number) {
  return `${value}m`;
}

export default function SlideDurationField() {
  const classes = useStyles();

  return (
    <FormControl fullWidth>
      <Grid container spacing={2}>
        <Grid item>
          <ScheduleIcon />
        </Grid>
        <Grid item>
          <Field
            className={classes.input}
            component={TextField}
            name="gameLength.min"
            margin="dense"
            inputProps={{
              type: "number",
              min: 1,
              "aria-labelledby": "game-length",
            }}
          />
        </Grid>
        <Grid item xs>
          <Field
            name="gameLength"
            aria-labelledby="game-length"
            getAriaValueText={getAriaValueText}
            valueLabelFormat={getValueLabelFormat}
            component={FormikSlider}
            marks={marks}
            min={1}
            max={60}
            valueLabelDisplay="auto"
            parse={({ min, max }: { min: number; max: number }) => [min, max]}
            format={([min, max]: [number, number]) => ({
              min,
              max,
            })}
          />
        </Grid>
        <Grid item>
          <Field
            className={classes.input}
            component={TextField}
            name="gameLength.max"
            margin="dense"
            inputProps={{
              type: "number",
              min: 1,
              "aria-labelledby": "game-length",
            }}
          />
        </Grid>
      </Grid>
    </FormControl>
  );
}
