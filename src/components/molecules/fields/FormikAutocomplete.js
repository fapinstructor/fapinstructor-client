// TODO: Convert this to typescript
import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getIn } from "formik";

const formatErrors = (errors) =>
  errors &&
  (typeof errors === "string"
    ? errors
    : errors
        .filter((error) => !!error)
        .map((error, index) => (
          <React.Fragment key={index}>
            {error}
            <br />
          </React.Fragment>
        )));

const FormikAutocomplete = (props) => {
  const {
    field,
    form: { dirty, touched, errors, setFieldValue },
    getOptionLabel,
    textFieldProps: { helperText, ...textFieldProps },
    ...autoCompleteProps
  } = props;

  const errorText = formatErrors(getIn(errors, field.name));
  const touchedVal = getIn(touched, field.name);
  const hasError = dirty && touchedVal && errorText !== undefined;
  const isMultiple = autoCompleteProps.multiple;
  const isMultipleWithValue = isMultiple && field.value;
  const canBeRendered = !isMultiple || isMultipleWithValue;

  if (isMultiple && field.value === null) {
    // eslint-disable-next-line no-console
    console.error(
      `Initial value of autocomplete with name: "${field.name}" cannot be null. Use [] instead.`
    );
  }

  const renderInput = (params) => {
    return (
      <TextField
        {...params}
        error={hasError}
        helperText={hasError ? errorText : helperText}
        {...textFieldProps}
      />
    );
  };

  const handleOnChange = (_, value) => {
    return setFieldValue(field.name, value);
  };

  return (
    <>
      {canBeRendered && (
        <Autocomplete
          value={field.value}
          onChange={handleOnChange}
          renderInput={renderInput}
          {...autoCompleteProps}
        />
      )}
    </>
  );
};

FormikAutocomplete.propTypes = {
  form: PropTypes.shape({
    dirty: PropTypes.bool,
    errors: PropTypes.object,
    setFieldValue: PropTypes.func,
  }).isRequired,
  options: PropTypes.array,
  getOptionLabel: PropTypes.func,
  textFieldProps: PropTypes.shape({
    label: PropTypes.string,
    required: PropTypes.bool,
    fullWidth: PropTypes.bool,
    margin: PropTypes.oneOf(["none", "dense", "normal"]),
  }),
};

FormikAutocomplete.defaultProps = {
  textFieldProps: {
    helperText: "",
  },
};

export default FormikAutocomplete;
