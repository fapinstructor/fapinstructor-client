import { Field } from "formik";
import { FormControl, FormHelperText, FormLabel } from "@material-ui/core";
import { TextField } from "formik-material-ui";

import styled from "styled-components/macro";
import theme from "theme";

const StyledField = styled(Field)`
  max-width: 100px;
  margin-top: 1rem;
`;

const RuinedOrgasmRangeFieldContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 1rem;

  @media screen and (${theme.breakpoint.mobile.up}) {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 32px;
  }
`;

export default function RuinedOrgasmsRangeField() {
  return (
    <RuinedOrgasmRangeFieldContainer>
      <FormControl>
        <FormLabel id="minimum-ruined-orgasms">
          Minimum Ruined Orgasms
        </FormLabel>
        <StyledField
          name="ruinedOrgasms.min"
          aria-labelledby="minimum-ruined-orgasms"
          component={TextField}
          type="number"
          inputProps={{ step: "1", min: "0", max: "1000" }}
          variant="outlined"
        />
        <FormHelperText>
          The minimum number of times you'll have to ruin your orgasm.
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel id="maximum-ruined-orgasms">
          Maximum Ruined Orgasms
        </FormLabel>
        <StyledField
          name="ruinedOrgasms.max"
          aria-labelledby="maximum-ruined-orgasms"
          component={TextField}
          type="number"
          inputProps={{ step: "1", min: "0", max: "1000" }}
          variant="outlined"
        />
        <FormHelperText>
          The maximum number of times you'll have to ruin your orgasm.
        </FormHelperText>
      </FormControl>
    </RuinedOrgasmRangeFieldContainer>
  );
}
