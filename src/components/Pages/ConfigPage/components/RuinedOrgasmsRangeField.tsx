import { Field } from "formik";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
} from "@material-ui/core";
import { TextField } from "formik-material-ui";

import styled from "styled-components/macro";

const StyledField = styled(Field)`
  max-width: 100px;
  margin-top: 1rem;
`;

export default function RuinedOrgasmsRangeField() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
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
      </Grid>
      <Grid item xs={6}>
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
      </Grid>
    </Grid>
  );
}
