import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  FormHelperText,
} from "@material-ui/core";

import Group from "components/molecules/Group";

const useStyles = makeStyles((theme) => ({
  control: {
    width: "100%",
  },
}));

type TimeStepProps = {
  values: {
    minimumGameTime: number;
    maximumGameTime: number;
  };
  errors: {
    minimumGameTime: string;
    maximumGameTime: string;
  };
  handleChange: (name: string, cast?: unknown) => (event: unknown) => unknown;
};

export default function TimeStep({
  values,
  errors,
  handleChange,
}: TimeStepProps) {
  const classes = useStyles();

  return (
    <Group title="Time">
      <Grid container spacing={10}>
        <Grid item xs={12} md={6}>
          <FormControl
            className={classes.control}
            required
            error={!!errors.minimumGameTime}
          >
            <InputLabel>Minimum Game Time</InputLabel>
            <Input
              id="minimumGameTime"
              value={values.minimumGameTime}
              required
              onChange={handleChange("minimumGameTime", Number)}
              type="number"
              inputProps={{ step: "1", min: "1" }}
              endAdornment={
                <InputAdornment position="end">minutes</InputAdornment>
              }
            />
            <FormHelperText>{errors.minimumGameTime}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl
            className={classes.control}
            required
            error={!!errors.maximumGameTime}
          >
            <InputLabel>Maximum Game Time</InputLabel>
            <Input
              id="maximumGameTime"
              value={values.maximumGameTime}
              required
              onChange={handleChange("maximumGameTime", Number)}
              type="number"
              inputProps={{ step: "1", min: "2" }}
              endAdornment={
                <InputAdornment position="end">minutes</InputAdornment>
              }
            />
            {errors.maximumGameTime ? (
              <FormHelperText>{errors.maximumGameTime}</FormHelperText>
            ) : (
              <FormHelperText>
                Just an estimate, other config options may impact this setting
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
      </Grid>
    </Group>
  );
}
