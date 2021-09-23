import { Field, useField } from "formik";
import { Switch, TextField } from "formik-material-ui";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  InputAdornment,
  InputLabel,
} from "@material-ui/core";
import styled from "styled-components/macro";

import theme from "theme";
import { FullBleed } from "components/templates/FullBleed";

const StyledField = styled(Field)`
  max-width: 120px;
  margin-top: 1rem;
`;
const StyledSwitch = styled(Field)`
  // The Switch has a padding of 12, this will cancel it out.
  margin-left: -12px;
`;

const PostOrgasmTortureDurationFieldContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 1rem;

  @media screen and (${theme.breakpoint.mobile.up}) {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 32px;
  }
`;

export default function PostOrgasmTortureDurationField() {
  const [postOrgasmTorture] = useField<boolean>("postOrgasmTorture");

  return (
    <PostOrgasmTortureDurationFieldContainer>
      <FullBleed>
        <InputLabel htmlFor="postOrgasmTorture">
          <StyledSwitch
            id="postOrgasmTorture"
            name="postOrgasmTorture"
            type="checkbox"
            component={Switch}
          />
          Enable Post Orgasm Torture
        </InputLabel>
      </FullBleed>
      <FormControl>
        <FormLabel id="minimum-post-orgasm-torture">
          Minimum Post Orgasm Torture Duration
        </FormLabel>
        <StyledField
          name="postOrgasmTortureDuration.min"
          aria-labelledby="minimum-post-orgasm-torture"
          component={TextField}
          type="number"
          inputProps={{ step: "10", min: "0" }}
          variant="outlined"
          disabled={!postOrgasmTorture.value}
          InputProps={{
            endAdornment: <InputAdornment position="end">sec</InputAdornment>,
          }}
        />
        <FormHelperText>
          The minimum duration you'll have to continue stroking after orgasm.
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel id="maximum-post-orgasm-torture">
          Minimum Post Orgasm Torture Duration
        </FormLabel>
        <StyledField
          name="postOrgasmTortureDuration.max"
          aria-labelledby="maximum-post-orgasm-torture"
          component={TextField}
          type="number"
          inputProps={{ step: "10", min: "0" }}
          variant="outlined"
          disabled={!postOrgasmTorture.value}
          InputProps={{
            endAdornment: <InputAdornment position="end">sec</InputAdornment>,
          }}
        />
        <FormHelperText>
          The maximum duration you'll have to continue stroking after orgasm.
        </FormHelperText>
      </FormControl>
    </PostOrgasmTortureDurationFieldContainer>
  );
}
