import { Field } from "formik";
import { TextField } from "formik-material-ui";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  InputAdornment,
} from "@material-ui/core";
import styled from "styled-components/macro";

import theme from "theme";

const StyledField = styled(Field)`
  max-width: 120px;
  margin-top: 1rem;
`;

const GameLengthFieldContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 1rem;

  @media screen and (${theme.breakpoint.mobile.up}) {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 32px;
  }
`;

export default function GameLengthField() {
  return (
    <GameLengthFieldContainer>
      <FormControl>
        <FormLabel id="minimum-game-length">Minimum Game Duration</FormLabel>
        <StyledField
          name="gameLength.min"
          aria-labelledby="minimum-game-length"
          component={TextField}
          type="number"
          inputProps={{ step: "1", min: "1" }}
          variant="outlined"
          InputProps={{
            endAdornment: <InputAdornment position="end">min</InputAdornment>,
          }}
        />
        <FormHelperText>
          The minimum duration the game will take to finish.
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel id="maximum-game-length">Maximum Game Duration</FormLabel>
        <StyledField
          name="gameLength.max"
          aria-labelledby="maximum-game-length"
          component={TextField}
          type="number"
          inputProps={{ step: "1", min: "1" }}
          variant="outlined"
          InputProps={{
            endAdornment: <InputAdornment position="end">min</InputAdornment>,
          }}
        />
        <FormHelperText>
          A rough maximum duration the game will take to finish.
        </FormHelperText>
      </FormControl>
    </GameLengthFieldContainer>
  );
}
