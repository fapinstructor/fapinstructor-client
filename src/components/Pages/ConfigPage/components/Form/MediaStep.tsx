import {
  Grid,
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
} from "@material-ui/core";
import { Field } from "formik";
import { CheckboxWithLabel } from "formik-material-ui";

import { MediaType } from "common/types/Media";
import Group from "components/molecules/Group";
import RedditSelectionField from "../RedditSelectionField";
import SlideDurationField from "../SlideDurationField";

type MediaStepProps = {
  errors: {
    mediaSource: string;
    redditId: string;
    slideDuration: string;
    imageType: string;
  };
};

export default function MediaStep({ errors }: MediaStepProps) {
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
            error={Boolean(errors.imageType)}
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
            <FormHelperText>{errors.imageType}</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    </Group>
  );
}
