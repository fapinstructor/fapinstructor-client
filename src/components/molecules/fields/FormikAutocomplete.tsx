import { Fragment } from "react";
import { FieldProps, getIn } from "formik";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

// TODO: See if this function actually receives a string
function formatErrors(errors: string[] | string) {
  if (!errors) {
    return;
  }

  if (typeof errors === "string") {
    return errors;
  } else {
    return (errors as string[])
      .filter((error) => !!error)
      .map((error, index) => (
        <Fragment key={index}>
          {error}
          <br />
        </Fragment>
      ));
  }
}

type AutocompleteProps = React.ComponentProps<typeof Autocomplete>;

type FormikAutocompleteProps = AutocompleteProps &
  FieldProps & {
    textFieldProps: TextFieldProps;
  };

// TODO: Need to handle when the user pastes.
// We should break up the string into separate tags if there is a delimiter
export default function FormikAutocomplete({
  field: { name: fieldName, value: fieldValue = [] },
  form: { dirty, errors, setFieldValue },
  getOptionLabel,
  textFieldProps: { helperText, ...textFieldProps },
  ...autoCompleteProps
}: FormikAutocompleteProps) {
  const errorText = formatErrors(getIn(errors, fieldName));
  // const touchedVal = getIn(touched, fieldName);
  const hasError = dirty && /*touchedVal &&*/ errorText !== undefined;
  const isMultiple = autoCompleteProps.multiple;

  if (isMultiple && fieldValue === null) {
    throw new Error(
      `Initial value of autocomplete with name: "${fieldName}" cannot be null. Use [] instead.`
    );
  }

  return (
    <Autocomplete
      {...autoCompleteProps}
      value={fieldValue}
      onChange={(event, value) => setFieldValue(fieldName, value)}
      renderInput={(inputParams) => (
        <TextField
          {...inputParams}
          error={hasError}
          helperText={hasError ? errorText : helperText}
          {...textFieldProps}
        />
      )}
    />
  );
}
