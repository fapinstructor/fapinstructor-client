import { Field, useField } from "formik";
import { Checkbox, TextField } from "formik-material-ui";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import FormikSlider from "components/molecules/fields/FormikSlider";

const useStyles = makeStyles({
  input: {
    width: 42,
    margin: 0,
  },
});

const marks = [
  { value: 10, label: "10s" },
  { value: 30, label: "30s" },
  { value: 60, label: "60s" },
  { value: 90, label: "90s" },
  { value: 120, label: "120s" },
];

function getAriaValueText(value: number) {
  return `${value} seconds`;
}

function getValueLabelFormat(value: number) {
  return `${value}s`;
}

export default function PostOrgasmTortureDurationField() {
  const classes = useStyles();
  const [postOrgasmTorture] = useField<boolean>("postOrgasmTorture");

  return (
    <FormControl fullWidth>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormLabel id="post-orgasm-torture">Post orgasm torture</FormLabel>
        </Grid>
        <Grid item>
          <Field
            component={Checkbox}
            type="checkbox"
            name="postOrgasmTorture"
          />
        </Grid>
        <Grid item>
          <Field
            className={classes.input}
            component={TextField}
            name="postOrgasmTortureDuration.min"
            disabled={!postOrgasmTorture.value}
            margin="dense"
            inputProps={{
              type: "number",
              min: 1,
              "aria-labelledby": "post-orgasm-torture",
            }}
          />
        </Grid>
        <Grid item xs>
          <Field
            name="postOrgasmTortureDuration"
            disabled={!postOrgasmTorture.value}
            aria-labelledby="post-orgasm-torture"
            getAriaValueText={getAriaValueText}
            valueLabelFormat={getValueLabelFormat}
            component={FormikSlider}
            marks={marks}
            min={0}
            max={120}
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
            disabled={!postOrgasmTorture.value}
            component={TextField}
            name="postOrgasmTortureDuration.max"
            margin="dense"
            inputProps={{
              type: "number",
              min: 1,
              "aria-labelledby": "post-orgasm-torture",
            }}
          />
        </Grid>
      </Grid>
      <FormHelperText>
        The range of time you'll have to continue stroking <em>after</em> you
        orgasm.
      </FormHelperText>
    </FormControl>
  );
}
