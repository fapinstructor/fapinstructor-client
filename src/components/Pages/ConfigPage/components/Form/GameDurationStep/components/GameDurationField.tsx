import { Field } from "formik";
import { TextField } from "formik-material-ui";
import { InputAdornment } from "@material-ui/core";
import styled from "styled-components/macro";

import theme from "theme";
import { GameConfig } from "configureStore";
import useAutoMaxField from "hooks/useAutoMaxField";

const GameDurationFieldContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 1rem;

  @media screen and (${theme.breakpoint.mobile.up}) {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 32px;
  }
`;

export default function GameDurationField() {
  useAutoMaxField<GameConfig>("gameDuration");

  return (
    <GameDurationFieldContainer>
      <Field
        type="number"
        name="gameDuration.min"
        label="Minimum Game Duration"
        component={TextField}
        inputProps={{ step: "1", min: "1" }}
        variant="outlined"
        InputProps={{
          endAdornment: <InputAdornment position="end">min</InputAdornment>,
        }}
        helperText="The minimum duration the game will take to finish."
      />
      <Field
        type="number"
        name="gameDuration.max"
        label="Maximum Game Duration"
        component={TextField}
        inputProps={{ step: "1", min: "1" }}
        variant="outlined"
        InputProps={{
          endAdornment: <InputAdornment position="end">min</InputAdornment>,
        }}
        helperText="A rough maximum duration the game will take to finish."
      />
    </GameDurationFieldContainer>
  );
}
