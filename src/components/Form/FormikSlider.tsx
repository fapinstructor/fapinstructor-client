import * as React from "react";
import MuiSlider, {
  SliderProps as MuiSliderProps,
} from "@material-ui/core/Slider";
import { FieldProps } from "formik";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface SliderProps
  extends FieldProps,
    Omit<MuiSliderProps, "name" | "value" | "onChange" | "defaultValue"> {
  format?: (value: number | number[]) => unknown;
  parse?: (value: unknown) => number | number[];
  onChange?: (name: string, value: number | number[]) => void;
  cap?: number;
}

export function fieldToSlider({
  field,
  form: { isSubmitting },
  disabled = false,
  ...props
}: Omit<SliderProps, "format">) {
  return {
    disabled: isSubmitting || disabled,
    ...props,
    ...field,
    name: field.name,
  };
}

export function FormikSlider({
  format,
  onChange,
  parse,
  cap = Number.MAX_VALUE,
  ...props
}: SliderProps) {
  const [value, setValue] = React.useState<number | number[]>(
    parse ? parse(props.field.value) : props.field.value
  );

  /**
   * If the value is changed outside of this component such as
   * setFieldValue, we need to update the local state.
   */
  React.useEffect(() => {
    setValue(parse ? parse(props.field.value) : props.field.value);
  }, [parse, props.field.value]);

  return (
    <MuiSlider
      {...fieldToSlider(props)}
      value={value}
      onChange={(e, value) => {
        setValue(value > cap ? cap : value);
      }}
      onChangeCommitted={(e, value) => {
        const cappedValue = value > cap ? cap : value;

        const event = {
          ...e,
          target: {
            ...e.target,
            name: props.field.name,
            value: format ? format(cappedValue) : cappedValue,
          },
        };

        props.field.onChange(event);
        onChange && onChange(props.field.name, cappedValue);
      }}
      onBlur={(e) =>
        props.field.onBlur({
          ...e,
          target: {
            ...e.target,
            name: props.field.name,
          },
        })
      }
    />
  );
}
