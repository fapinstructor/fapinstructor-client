import { Field } from "formik";
import FormikAutocomplete from "components/molecules/fields/FormikAutocomplete";

const textFieldProps = {
  label: "Subreddits",
  helperText: "Enter a subreddit name and then press enter ",
  fullWidth: true,
  variant: "outlined",
};

export default function RedditSelectionField() {
  return (
    <Field
      name="subreddits"
      component={FormikAutocomplete}
      textFieldProps={textFieldProps}
      multiple={true}
      freeSolo={true}
      filterSelectedOptions={true}
      /**
       * TODO: An empty array is required, even if we are free solo.
       * Can be adjusted once we add a list of subreddits to the db
       */
      options={[]}
    />
  );
}
