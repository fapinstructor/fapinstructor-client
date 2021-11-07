import {
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
} from "@material-ui/core";
import { Field, useField } from "formik";
import { CheckboxWithLabel } from "formik-material-ui";

import { MediaType } from "@/common/types/Media";
import { Group } from "@/components/Group";
import RedditSelectionField from "./components/RedditSelectionField";
import SlideDurationField from "./components/SlideDurationField";

export default function MediaStep() {
  const [, meta] = useField("imageType");

  return (
    <Group title="Media">
      <RedditSelectionField />
      <SlideDurationField />
      <FormControl component="fieldset" required error={Boolean(meta.error)}>
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
    </Group>
  );
}
