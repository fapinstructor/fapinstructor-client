import { Field } from "formik";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
} from "@material-ui/core";
import styled from "styled-components/macro";
import { TextField } from "formik-material-ui";

const StyledField = styled(Field)`
  max-width: 100px;
  margin-top: 1rem;
`;

export default function StrokeSpeedField() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FormControl>
          <FormLabel id="minimum-stroke-speed">Minimum Stroke Speed</FormLabel>
          <StyledField
            name="strokeSpeed.min"
            aria-labelledby="minimum-stroke-speed"
            component={TextField}
            type="number"
            inputProps={{ step: "0.25", min: "0" }}
            variant="outlined"
          />
          <FormHelperText>
            The minimum number of strokes per second.
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl>
          <FormLabel id="maximum-stroke-speed">Maximum Stroke Speed</FormLabel>
          <StyledField
            name="strokeSpeed.max"
            aria-labelledby="maximum-stroke-speed"
            component={TextField}
            type="number"
            inputProps={{ step: "0.5", min: "1" }}
            variant="outlined"
          />
          <FormHelperText>
            The maximum number of strokes per second.
          </FormHelperText>
        </FormControl>
      </Grid>
    </Grid>
  );
}
