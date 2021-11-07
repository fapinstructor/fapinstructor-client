import { useEffect } from "react";
import { Field } from "formik";
import { FormikAutocomplete } from "@/components/Form";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const textFieldProps = {
  label: "Tags",
  fullWidth: true,
  required: true,
  helperText: "Enter tag name and then press enter ",
};

export type TagsFieldProps = {
  value?: string[];
  onChange?: (tags: string[]) => void;
  tags: string[];
  loading: boolean;
  fetchTags: () => void;
};

export default function TagsField({
  value,
  onChange,
  fetchTags,
  tags,
  loading,
}: TagsFieldProps) {
  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

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
        loading={loading}
        options={tags}
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
      loading={loading}
      options={tags}
    />
  );
}
