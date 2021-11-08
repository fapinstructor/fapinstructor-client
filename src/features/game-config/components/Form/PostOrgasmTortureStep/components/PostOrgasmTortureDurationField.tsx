import { Field, useField } from "formik";
import { Switch, TextField } from "formik-material-ui";
import { InputAdornment, InputLabel } from "@material-ui/core";
import styled from "styled-components/macro";

import theme from "@/theme";
import { FullBleed } from "@/components/Templates";
import useAutoMaxField from "@/hooks/useAutoMaxField";
import { GameConfig } from "@/configureStore";

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
  useAutoMaxField<GameConfig>("postOrgasmTortureDuration");
  const [postOrgasmTorture] = useField<boolean>("postOrgasmTorture");

  return (
    <PostOrgasmTortureDurationFieldContainer>
      <FullBleed>
        <InputLabel htmlFor="postOrgasmTorture">
          <Field
            id="postOrgasmTorture"
            name="postOrgasmTorture"
            type="checkbox"
            component={Switch}
          />
          Enable Post Orgasm Torture
        </InputLabel>
      </FullBleed>
      <Field
        label="Minimum Post Orgasm Torture Duration"
        name="postOrgasmTortureDuration.min"
        component={TextField}
        type="number"
        inputProps={{ step: "10", min: "0" }}
        variant="outlined"
        disabled={!postOrgasmTorture.value}
        InputProps={{
          endAdornment: <InputAdornment position="end">sec</InputAdornment>,
        }}
      />
      <Field
        label="Minimum Post Orgasm Torture Duration"
        name="postOrgasmTortureDuration.max"
        component={TextField}
        type="number"
        inputProps={{ step: "10", min: "0" }}
        variant="outlined"
        disabled={!postOrgasmTorture.value}
        InputProps={{
          endAdornment: <InputAdornment position="end">sec</InputAdornment>,
        }}
      />
    </PostOrgasmTortureDurationFieldContainer>
  );
}
