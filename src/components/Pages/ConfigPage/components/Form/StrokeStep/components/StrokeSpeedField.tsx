import { Field } from "formik";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  InputAdornment,
} from "@material-ui/core";
import styled from "styled-components/macro";
import { TextField } from "formik-material-ui";
import theme from "theme";

const StyledField = styled(Field)`
  max-width: 170px;
  margin-top: 1rem;
`;

const StrokeSpeedFieldContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 1rem;

  @media screen and (${theme.breakpoint.mobile.up}) {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 32px;
  }
`;

export default function StrokeSpeedField() {
  return (
    <StrokeSpeedFieldContainer>
      <FormControl>
        <FormLabel id="minimum-stroke-speed">Minimum Stroke Speed</FormLabel>
        <StyledField
          name="strokeSpeed.min"
          aria-labelledby="minimum-stroke-speed"
          component={TextField}
          type="number"
          inputProps={{ step: "0.25", min: "0" }}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">per sec</InputAdornment>
            ),
          }}
        />
        <FormHelperText>
          The minimum number of strokes per second.
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel id="maximum-stroke-speed">Maximum Stroke Speed</FormLabel>
        <StyledField
          name="strokeSpeed.max"
          aria-labelledby="maximum-stroke-speed"
          component={TextField}
          type="number"
          inputProps={{ step: "0.5", min: "1" }}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">per sec</InputAdornment>
            ),
          }}
        />
        <FormHelperText>
          The maximum number of strokes per second.
        </FormHelperText>
      </FormControl>
    </StrokeSpeedFieldContainer>
  );
}
