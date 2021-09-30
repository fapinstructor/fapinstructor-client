import * as React from "react";
import { useFormikContext } from "formik";

/**
 * Automatically update the max value when the min value surpasses it.
 * @param field The form field to operate on.
 */
export default function useAutoMaxField<Form>(field: keyof Form) {
  const form =
    useFormikContext<Record<keyof Form, { min: number; max: number }>>();

  React.useEffect(() => {
    if (form.values[field].min > form.values[field].max) {
      form.setFieldValue(`${field}.max`, form.values[field].min);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values[field].min]);
}
