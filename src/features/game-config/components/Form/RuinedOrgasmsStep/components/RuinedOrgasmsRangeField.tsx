import { Field } from "formik";
import { TextField } from "formik-material-ui";
import styled from "styled-components/macro";

import theme from "@/theme";
import { GameConfig } from "@/configureStore";
import useAutoMaxField from "@/hooks/useAutoMaxField";

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
  useAutoMaxField<GameConfig>("ruinedOrgasms");

  return (
    <RuinedOrgasmRangeFieldContainer>
      <Field
        label="Minimum Ruined Orgasms"
        name="ruinedOrgasms.min"
        component={TextField}
        type="number"
        inputProps={{ step: "1", min: "0", max: "1000" }}
        variant="outlined"
      />
      <Field
        label="Maximum Ruined Orgasms"
        name="ruinedOrgasms.max"
        component={TextField}
        type="number"
        inputProps={{ step: "1", min: "0", max: "1000" }}
        variant="outlined"
      />
    </RuinedOrgasmRangeFieldContainer>
  );
}
