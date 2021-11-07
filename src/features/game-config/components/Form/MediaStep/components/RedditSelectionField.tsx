import { Field } from "formik";
import { FormikAutocomplete } from "@/components/Form";

const textFieldProps = {
  label: "Subreddits",
  helperText: "Enter a subreddit name and then press enter.",
  fullWidth: true,
  variant: "outlined",
};

export default function RedditSelectionField() {
  return (
    <Field
      name="subreddits"
      limitTags={10}
      component={FormikAutocomplete}
      textFieldProps={textFieldProps}
      multiple
      freeSolo
      filterSelectedOptions
      breakSpaces
      options={[]}
    />
  );
}
