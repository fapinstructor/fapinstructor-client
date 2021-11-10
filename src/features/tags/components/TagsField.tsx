import { Field } from "formik";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { FormikAutocomplete } from "@/components/Form";

import { useTags } from "../api/getTags";

const textFieldProps = {
  label: "Tags",
  fullWidth: true,
  required: true,
  helperText: "Enter tag name and then press enter ",
};

export type TagsFieldProps = {
  value?: string[];
  onChange?: (tags: string[]) => void;
};

export function TagsField({ value, onChange }: TagsFieldProps) {
  const tagsQuery = useTags();

  if (onChange) {
    return (
      <Autocomplete
        multiple
        freeSolo
        filterSelectedOptions
        value={value}
        onChange={(_, values) => {
          onChange(values);
        }}
        renderInput={(params) => <TextField {...params} {...textFieldProps} />}
        loading={tagsQuery.isLoading}
        options={tagsQuery.data || []}
      />
    );
  }
  return (
    <Field
      name="tags"
      component={FormikAutocomplete}
      textFieldProps={textFieldProps}
      multiple
      freeSolo
      filterSelectedOptions
      loading={tagsQuery.isLoading}
      options={tagsQuery.data}
    />
  );
}
