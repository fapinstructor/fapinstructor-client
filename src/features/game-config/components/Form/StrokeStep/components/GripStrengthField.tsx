import { Field, useField } from "formik";
import { Switch, Select } from "formik-material-ui";
import { MenuItem, FormControl, InputLabel } from "@material-ui/core";

import {
  GripStrength,
  GripStrengthString,
} from "@/game/xstate/machines/gripMachine";
import { FullBleed } from "@/components/Templates";

export default function GripStrengthField() {
  const [gripAdjustments] = useField<boolean>("gripAdjustments");

  return (
    <>
      <FullBleed>
        <InputLabel htmlFor="gripAdjustments">
          <Field
            id="gripAdjustments"
            name="gripAdjustments"
            type="checkbox"
            component={Switch}
          />
          Enable grip adjustments
        </InputLabel>
      </FullBleed>
      <FormControl fullWidth>
        <InputLabel>Starting Grip Strength</InputLabel>
        <Field
          component={Select}
          name="initialGripStrength"
          inputProps={{
            id: "grip-strength",
          }}
          disabled={!gripAdjustments.value}
        >
          <MenuItem value={GripStrength.BarelyTouching}>
            {GripStrengthString[GripStrength.BarelyTouching]}
          </MenuItem>
          <MenuItem value={GripStrength.VeryLight}>
            {GripStrengthString[GripStrength.VeryLight]}
          </MenuItem>
          <MenuItem value={GripStrength.Light}>
            {GripStrengthString[GripStrength.Light]}
          </MenuItem>
          <MenuItem value={GripStrength.Normal}>
            {GripStrengthString[GripStrength.Normal]}
          </MenuItem>
          <MenuItem value={GripStrength.Tight}>
            {GripStrengthString[GripStrength.Tight]}
          </MenuItem>
          <MenuItem value={GripStrength.VeryTight}>
            {GripStrengthString[GripStrength.VeryTight]}
          </MenuItem>
          <MenuItem value={GripStrength.DeathGrip}>
            {GripStrengthString[GripStrength.DeathGrip]}
          </MenuItem>
        </Field>
      </FormControl>
    </>
  );
}
