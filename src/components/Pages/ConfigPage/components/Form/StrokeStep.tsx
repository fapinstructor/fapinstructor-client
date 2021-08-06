import * as React from "react";
import store from "store";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Select,
  MenuItem,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  FormHelperText,
} from "@material-ui/core";

import Group from "components/molecules/Group";
import {
  GripStrength,
  GripStrengthString,
} from "game/xstate/machines/gripMachine";

const useStyles = makeStyles((theme) => ({
  control: {
    width: "100%",
  },
}));

type StrokeStepProps = {
  errors: {
    slowestStrokeSpeed: string;
    fastestStrokeSpeed: string;
  };
  handleChange: (name: string, cast?: unknown) => (event: unknown) => unknown;
};

export default function StrokeStep({ errors, handleChange }: StrokeStepProps) {
  const classes = useStyles();

  return (
    <Group title="Stroke">
      <Grid container spacing={10}>
        <Grid item xs={12} md={3}>
          {/* <FormControl
                      className={classes.control}
                      error={!!errors.defaultStrokeStyle}
                      title={
                        "Select the most occurring stroke style during this game. Only active Stroke Styles " +
                        "can be chosen. 'Hands Off' can not be chosen."
                      }
                    >
                      <InputLabel>Default Stroke Style</InputLabel>
                      <Select
                        value={store.config.defaultStrokeStyle}
                        onChange={this.handleChange("defaultStrokeStyle", Number)}
                      >
                        {StrokeStyles.entries(([strokeStyle, config]) => (
                          <MenuItem
                            key={strokeStyle}
                            value={config.label}
                            disabled={
                              !store.config.tasks[key] || key === "handsOff"
                            }
                          >
                            {StrokeStyleString[StrokeStyleEnum[key]]}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>{errors.defaultStrokeStyle}</FormHelperText>
                    </FormControl> */}
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl className={classes.control}>
            <InputLabel>Initial Grip Strength</InputLabel>
            <Select
              value={store.config.initialGripStrength}
              onChange={handleChange("initialGripStrength", Number)}
            >
              <MenuItem value={GripStrength.BarelyTouching}>
                {GripStrengthString[GripStrength.BarelyTouching]}
              </MenuItem>
              <MenuItem value={GripStrength.VeryLight}>
                {GripStrengthString[GripStrength.VeryLight]}
              </MenuItem>
              <MenuItem value={GripStrength.Light}>
                {GripStrengthString[GripStrength.Light]}
              </MenuItem>
              <MenuItem value={GripStrength.Normal}>
                {GripStrengthString[GripStrength.Normal]}
              </MenuItem>
              <MenuItem value={GripStrength.Tight}>
                {GripStrengthString[GripStrength.Tight]}
              </MenuItem>
              <MenuItem value={GripStrength.VeryTight}>
                {GripStrengthString[GripStrength.VeryTight]}
              </MenuItem>
              <MenuItem value={GripStrength.DeathGrip}>
                {GripStrengthString[GripStrength.DeathGrip]}
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl
            className={classes.control}
            error={!!errors.slowestStrokeSpeed}
          >
            <InputLabel>Slowest Stroke Speed</InputLabel>
            <Input
              id="slowestStrokeSpeed"
              value={store.config.slowestStrokeSpeed}
              onChange={handleChange("slowestStrokeSpeed", Number)}
              fullWidth
              type="number"
              inputProps={{ step: "0.50", min: "0.1", max: "8" }}
              endAdornment={
                <InputAdornment position="end">seconds</InputAdornment>
              }
            />
            <FormHelperText>{errors.slowestStrokeSpeed}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl
            className={classes.control}
            error={!!errors.fastestStrokeSpeed}
          >
            <InputLabel>Fastest Stroke Speed</InputLabel>
            <Input
              id="fastestStrokeSpeed"
              value={store.config.fastestStrokeSpeed}
              onChange={handleChange("fastestStrokeSpeed", Number)}
              fullWidth
              type="number"
              inputProps={{ step: "0.50", min: "0.1", max: "8" }}
              endAdornment={
                <InputAdornment position="end">seconds</InputAdornment>
              }
            />
            <FormHelperText>{errors.fastestStrokeSpeed}</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    </Group>
  );
}
