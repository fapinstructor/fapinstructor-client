import * as React from "react";
import MuiSwitch from "@material-ui/core/Switch";
import FormControlLabel, {
  FormControlLabelProps as MuiFormControlLabelProps,
} from "@material-ui/core/FormControlLabel";
import { fieldToSwitch, SwitchProps } from "formik-material-ui";
import { FieldProps } from "formik";

/**
 * Exclude props that are passed directly to the control
 * https://github.com/mui-org/material-ui/blob/v3.1.1/packages/material-ui/src/FormControlLabel/FormControlLabel.js#L71
 */
export interface SwitchWithLabelProps extends FieldProps, SwitchProps {
  Label: Omit<
    MuiFormControlLabelProps,
    "checked" | "name" | "onChange" | "value" | "control"
  >;
}

export default function SwitchWithLabel({
  Label,
  ...props
}: SwitchWithLabelProps) {
  return (
    <FormControlLabel
      control={<MuiSwitch {...fieldToSwitch(props)} />}
      {...Label}
    />
  );
}
SwitchWithLabel.displayName = "FormikMaterialUISwitchWithLabel";
