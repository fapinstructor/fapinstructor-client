import { Field } from "formik";
import { FormControl, FormHelperText, FormLabel } from "@material-ui/core";

import FormikSlider from "components/molecules/fields/FormikSlider";

const marks = [
  { value: 5, label: "5s" },
  { value: 30, label: "30s" },
  { value: 60, label: "60s" },
];

function getAriaValueText(value: number) {
  return `${value} seconds`;
}

function getValueLabelFormat(value: number) {
  return `${value}s`;
}

type CooldownFieldProps = {
  name: string;
  label: string;
  helperText: string;
  disabled?: boolean;
};

export default function CooldownField({
  name,
  label,
  helperText,
  disabled,
}: CooldownFieldProps) {
  return (
    <FormControl fullWidth>
      <FormLabel id={name}>{label}</FormLabel>
      <Field
        name={name}
        disabled={disabled}
        aria-labelledby={name}
        getAriaValueText={getAriaValueText}
        valueLabelFormat={getValueLabelFormat}
        component={FormikSlider}
        marks={marks}
        min={5}
        max={60}
        valueLabelDisplay="auto"
      />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}
