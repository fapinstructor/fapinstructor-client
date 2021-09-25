import { Field } from "formik";
import { TextField } from "formik-material-ui";

export default function MinimumEdgesField() {
  return (
    <Field
      label="Minimum Edges"
      name="minimumEdges"
      component={TextField}
      type="number"
      inputProps={{ step: "1", min: "0", max: "1000" }}
      variant="outlined"
    />
  );
}
