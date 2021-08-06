import store from "store";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Switch,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from "@material-ui/core";

import Group from "components/molecules/Group";

const useStyles = makeStyles((theme) => ({
  control: {
    width: "100%",
  },
}));

type MediaStepProps = {
  errors: {
    mediaSource: string;
    redditId: string;
    slideDuration: string;
    imageType: string;
  };
  handleChange: (name: string, cast?: unknown) => (event: unknown) => unknown;
  handleCheckChange: (name: string) => (event: unknown) => unknown;
};

export default function MediaStep({
  errors,
  handleChange,
  handleCheckChange,
}: MediaStepProps) {
  const classes = useStyles();

  return (
    <Group title="Media">
      <Grid container>
        <Grid item xs={12}>
          <FormControl
            className={classes.control}
            required
            error={!!errors.mediaSource || !!errors.redditId}
          >
            <InputLabel>Subreddits</InputLabel>
            <Input
              id="redditId"
              required
              value={store.config.redditId}
              onChange={handleChange("redditId")}
            />
            {errors.mediaSource || errors.redditId ? (
              <FormHelperText>
                {errors.mediaSource || errors.redditId}
              </FormHelperText>
            ) : (
              <FormHelperText>
                You can add multiple subreddits each separated by a comma
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl
            className={classes.control}
            required
            error={!!errors.slideDuration}
          >
            <InputLabel>Slide Duration</InputLabel>
            <Input
              id="slideDuration"
              value={store.config.slideDuration}
              onChange={handleChange("slideDuration", Number)}
              type="number"
              inputProps={{ step: "1", min: "3" }}
              endAdornment={
                <InputAdornment position="end">seconds</InputAdornment>
              }
            />
            {errors.slideDuration ? (
              <FormHelperText>{errors.slideDuration}</FormHelperText>
            ) : (
              <FormHelperText>Applies to static images and gifs</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset" required error={!!errors.imageType}>
            <FormLabel component="legend">Media Type</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={store.config.gifs}
                    onChange={handleCheckChange("gifs")}
                    value="gifs"
                  />
                }
                label="Gifs"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={store.config.pictures}
                    onChange={handleCheckChange("pictures")}
                    value="pictures"
                  />
                }
                label="Pictures"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={store.config.videos}
                    onChange={handleCheckChange("videos")}
                    value="videos"
                  />
                }
                label="Videos"
              />
            </FormGroup>
            <FormHelperText>{errors.imageType}</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    </Group>
  );
}
