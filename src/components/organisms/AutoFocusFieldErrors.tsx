import * as React from "react";
import { useFormikContext } from "formik";

type FirstErrorKey = {
  [key: string]: string | FirstErrorKey;
};

/**
 * Recursively iterate over all errors within the Formik error object and
 * returns the first form field id.
 */
function getFirstErrorKey(errors: FirstErrorKey, keys: string[] = []): string {
  const firstErrorKey = Object.keys(errors)[0];
  const firstErrorValue = errors[firstErrorKey];

  if (typeof firstErrorValue === "object") {
    return getFirstErrorKey(firstErrorValue, [...keys, firstErrorKey]);
  }
  return [...keys, firstErrorKey].join(".");
}

type FocusFieldErrorProps = {
  children: React.ReactNode;
};

/**
 * Wraps a form and watches the formik context for submissions.  It will then attempt
 * to autofocus the first field with an error.
 */
export default function AutoFocusFieldErrors({
  children,
}: FocusFieldErrorProps) {
  const formik = useFormikContext();

  const [shouldFocus, setShouldFocus] = React.useState(false);

  React.useEffect(() => {
    // Enable autofocus an error field when the form is submitted.
    if (formik.submitCount > 0) {
      setShouldFocus(true);
    }
  }, [formik.submitCount]);

  React.useEffect(() => {
    if (!formik.isValid && shouldFocus && formik.touched) {
      const firstErrorKey = getFirstErrorKey(formik.errors);
      if (global.window.document.getElementsByName(firstErrorKey).length) {
        // Disable autofocus after the focusing the first field.
        setShouldFocus(false);
        global.window.document.getElementsByName(firstErrorKey)[0].focus();
      }
    }
  }, [formik.isValid, formik.errors, formik.touched, shouldFocus]);

  // Workaround since JSX components can't return a ReactNode.
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}
