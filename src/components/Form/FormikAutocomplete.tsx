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
    breakSpaces?: boolean;
  };

function formatValues(values: string[]) {
  values = values.map(formatValue);
  // Remove duplicate items
  values = Array.from(new Set(values));

  return values;
}
function formatValue(value: string) {
  return value.trim().toLowerCase();
}

export function FormikAutocomplete({
  field: { name: fieldName, value: fieldValue = [] },
  form: { dirty, errors, setFieldValue },
  getOptionLabel,
  textFieldProps: { helperText, ...textFieldProps },
  breakSpaces,
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
      onChange={(event, values: string[]) =>
        setFieldValue(fieldName, formatValues(values))
      }
      onInputChange={(event, value, reason) => {
        if (breakSpaces) {
          const trailingSpace = /\S\s$/.test(value);
          const multipleSpaces = value.split(" ").filter((v) => v);

          if (multipleSpaces.length > 1) {
            // If there's any spaces, split and add as separate tags.
            setFieldValue(
              fieldName,
              formatValues([...fieldValue, ...multipleSpaces])
            );
          } else if (trailingSpace) {
            // If there is a trailing space, auto submit the tag.
            setFieldValue(fieldName, formatValues([...fieldValue, value]));
          }
        }
      }}
      renderInput={(inputParams) => (
        <TextField
          type="search"
          {...inputParams}
          error={hasError}
          helperText={hasError ? errorText : helperText}
          {...textFieldProps}
        />
      )}
    />
  );
}
