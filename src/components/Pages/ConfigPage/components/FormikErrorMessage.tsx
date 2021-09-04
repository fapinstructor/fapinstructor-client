import { FormHelperText } from "@material-ui/core";
import { ErrorMessage, ErrorMessageProps } from "formik";

type FormikErrorMessageProps = ErrorMessageProps;

export default function FormikErrorMessage(props: FormikErrorMessageProps) {
  return (
    <ErrorMessage {...props}>
      {(errorMessage) => <FormHelperText error>{errorMessage}</FormHelperText>}
    </ErrorMessage>
  );
}
