import { Field } from "formik";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
} from "@material-ui/core";
import TimelapseIcon from "@material-ui/icons/Timelapse";

import FormikSlider from "components/molecules/fields/FormikSlider";

const marks = [
  { value: 0, label: "0%" },
  { value: 50, label: "50%" },
  { value: 100, label: "100%" },
];

export default function EdgeFrequencyField() {
  return (
    <FormControl fullWidth>
      <FormLabel id="edge-frequency">Edge Frequency</FormLabel>
      <Grid container spacing={2}>
        <Grid item>
          <TimelapseIcon />
        </Grid>
        <Grid item xs>
          <Field
            name="edgeFrequency"
            aria-labelledby="edge-frequency"
            component={FormikSlider}
            marks={marks}
            min={0}
            max={100}
            valueLabelDisplay="auto"
          />
        </Grid>
      </Grid>
      <FormHelperText>Increases the frequency of edges.</FormHelperText>
    </FormControl>
  );
}
