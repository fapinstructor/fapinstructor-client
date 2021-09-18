import { Field } from "formik";
import { FormControl, FormHelperText, FormLabel } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import styled from "styled-components/macro";

const StyledField = styled(Field)`
  max-width: 100px;
  margin-top: 1rem;
`;

export default function MinimumEdgesField() {
  return (
    <FormControl fullWidth>
      <FormLabel id="minimum-edges">Minimum Edges</FormLabel>
      <StyledField
        name="minimumEdges"
        aria-labelledby="minimum-edges"
        component={TextField}
        type="number"
        inputProps={{ step: "1", min: "0", max: "1000" }}
        variant="outlined"
      />
      <FormHelperText>
        The minimum number of times you'll have to edge.
      </FormHelperText>
    </FormControl>
  );
}
