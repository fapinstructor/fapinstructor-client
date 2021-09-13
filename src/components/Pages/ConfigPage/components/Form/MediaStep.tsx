import {
  Grid,
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
} from "@material-ui/core";
import { Field, useField } from "formik";
import { CheckboxWithLabel } from "formik-material-ui";

import { MediaType } from "common/types/Media";
import Group from "components/molecules/Group";
import RedditSelectionField from "../RedditSelectionField";
import SlideDurationField from "../SlideDurationField";

export default function MediaStep() {
  const [, meta] = useField("imageType");

  return (
    <Group title="Media">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <RedditSelectionField />
        </Grid>
        <Grid item xs={4}>
          <SlideDurationField />
        </Grid>
        <Grid item xs={8} />
        <Grid item xs={12}>
          <FormControl
            component="fieldset"
            required
            error={Boolean(meta.error)}
          >
            <FormLabel component="legend">Media Type</FormLabel>
            <FormGroup>
              <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name="imageType"
                value={MediaType.Gif}
                Label={{ label: "Gifs" }}
              />
              <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name="imageType"
                value={MediaType.Picture}
                Label={{ label: "Pictures" }}
              />
              <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name="imageType"
                value={MediaType.Video}
                Label={{ label: "Videos" }}
              />
            </FormGroup>
            <FormHelperText>{meta.error}</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    </Group>
  );
}
