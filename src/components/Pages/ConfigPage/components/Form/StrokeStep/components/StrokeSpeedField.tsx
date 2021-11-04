import { Field } from "formik";
import { InputAdornment } from "@material-ui/core";
import styled from "styled-components/macro";
import { TextField } from "formik-material-ui";

import theme from "@/theme";
import useAutoMaxField from "@/hooks/useAutoMaxField";
import { GameConfig } from "@/configureStore";

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
  useAutoMaxField<GameConfig>("strokeSpeed");

  return (
    <StrokeSpeedFieldContainer>
      <Field
        label="Minimum Stroke Speed"
        name="strokeSpeed.min"
        component={TextField}
        type="number"
        inputProps={{ step: "0.25", min: "0" }}
        variant="outlined"
        InputProps={{
          endAdornment: <InputAdornment position="end">per sec</InputAdornment>,
        }}
        helperText="The minimum number of strokes per second."
      />
      <Field
        label="Maximum Stroke Speed"
        name="strokeSpeed.max"
        component={TextField}
        type="number"
        inputProps={{ step: "0.5", min: "1", max: "8" }}
        variant="outlined"
        InputProps={{
          endAdornment: <InputAdornment position="end">per sec</InputAdornment>,
        }}
        helperText="The maximum number of strokes per second."
      />
    </StrokeSpeedFieldContainer>
  );
}
