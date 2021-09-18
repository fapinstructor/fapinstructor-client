import { Field } from "formik";
import { MenuItem, FormControl, InputLabel } from "@material-ui/core";
import { Select } from "formik-material-ui";

import {
  GripStrength,
  GripStrengthString,
} from "game/xstate/machines/gripMachine";

export default function GripStrengthField() {
  return (
    <FormControl fullWidth>
      <InputLabel>Starting Grip Strength</InputLabel>
      <Field
        component={Select}
        name="initialGripStrength"
        inputProps={{
          id: "grip-strength",
        }}
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
  );
}
