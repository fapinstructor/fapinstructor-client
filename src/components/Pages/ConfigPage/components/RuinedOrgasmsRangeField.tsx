import { Field, useField } from "formik";
import {
  Grid,
  FormControl,
  FormHelperText,
  FormLabel,
} from "@material-ui/core";
import { Checkbox } from "formik-material-ui";

import FormikSlider from "components/molecules/fields/FormikSlider";

const marks = [
  { value: 0, label: 0 },
  { value: 5, label: 5 },
  { value: 10, label: 10 },
];

export default function RuinedOrgasmsRangeField() {
  const [enableRuinedOrgasms] = useField<boolean>("enableRuinedOrgasms");

  return (
    <FormControl fullWidth>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormLabel id="ruined-orgasms">Ruined orgasms</FormLabel>
        </Grid>
        <Grid item>
          <Field
            component={Checkbox}
            type="checkbox"
            name="enableRuinedOrgasms"
          />
        </Grid>
        <Grid item xs>
          <Field
            name="ruinedOrgasms"
            aria-labelledby="ruined-orgasms"
            component={FormikSlider}
            marks={marks}
            min={0}
            max={10}
            disabled={!enableRuinedOrgasms.value}
            valueLabelDisplay="auto"
            parse={({ min, max }: { min: number; max: number }) => [min, max]}
            format={([min, max]: [number, number]) => ({
              min,
              max,
            })}
          />
        </Grid>
      </Grid>
      <FormHelperText>
        The minimum and maximum times you'll have to ruin your orgasm.
      </FormHelperText>
    </FormControl>
  );
}
