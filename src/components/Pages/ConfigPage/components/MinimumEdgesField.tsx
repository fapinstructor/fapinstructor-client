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
  { value: 0, label: "0" },
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 40, label: "40" },
  { value: 80, label: "80" },
];

export default function MinimumEdgesField() {
  return (
    <FormControl fullWidth>
      <FormLabel id="minimum-edges">Minimum Edges</FormLabel>
      <Grid container spacing={2}>
        <Grid item>
          <TimelapseIcon />
        </Grid>
        <Grid item xs>
          <Field
            name="minimumEdges"
            aria-labelledby="minimum-edges"
            component={FormikSlider}
            marks={marks}
            min={0}
            max={80}
            valueLabelDisplay="auto"
          />
        </Grid>
      </Grid>
      <FormHelperText>
        The minimum number of times you'll have to edge.
      </FormHelperText>
    </FormControl>
  );
}
