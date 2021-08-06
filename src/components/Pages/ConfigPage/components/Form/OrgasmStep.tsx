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
  FormHelperText,
  FormLabel,
} from "@material-ui/core";

import Group from "components/molecules/Group";

const useStyles = makeStyles((theme) => ({
  control: {
    width: "100%",
  },
}));

type OrgasmStepProps = {
  errors: {
    finalOrgasm: string;
    finalOrgasmRandom: string;
    allowedProbability: string;
    deniedProbability: string;
    ruinedProbability: string;
    postOrgasmTortureMinimumTime: string;
    postOrgasmTortureMaximumTime: string;
    minimumRuinedOrgasms: string;
    maximumRuinedOrgasms: string;
    ruinCooldown: string;
  };
  handleFinalOrgasmGroupCheckChange: (
    name: string
  ) => (event: unknown, checked: boolean) => void;
  handleFinalOrgasmGroupCheck: (name: string) => (event: unknown) => void;
  handleChange: (name: string, cast?: unknown) => (event: unknown) => unknown;
  handleCheckChange: (name: string) => (event: unknown) => unknown;
};

export default function OrgasmStep({
  errors,
  handleChange,
  handleCheckChange,
  handleFinalOrgasmGroupCheck,
  handleFinalOrgasmGroupCheckChange,
}: OrgasmStepProps) {
  const classes = useStyles();

  return (
    <Group title="Orgasm">
      <Grid container spacing={10}>
        <Grid item xs={12} md={6}>
          <FormControl
            component="fieldset"
            required
            error={!!errors.finalOrgasm || !!errors.finalOrgasmRandom}
          >
            <FormLabel component="legend">Final Orgasm</FormLabel>
            <Grid container direction="row" alignItems="center">
              <Grid container direction="column">
                <Grid item>
                  <FormControlLabel
                    title={
                      "Whether you will be allowed to have a full orgasm in the end"
                    }
                    control={
                      <Switch
                        checked={store.config.finalOrgasmAllowed}
                        onChange={handleFinalOrgasmGroupCheckChange(
                          "finalOrgasmAllowed"
                        )}
                        value="finalOrgasmAllowed"
                      />
                    }
                    label="Allowed"
                  />
                </Grid>
                <Grid item xs={10}>
                  <FormControl
                    className={classes.control}
                    required={!!store.config.finalOrgasmRandom}
                    error={
                      !!errors.allowedProbability ||
                      (!!store.config.finalOrgasmRandom && !!errors.finalOrgasm)
                    }
                  >
                    <InputLabel>Probability</InputLabel>
                    <Input
                      id="allowedProbability"
                      value={store.config.allowedProbability}
                      onChange={handleFinalOrgasmGroupCheck(
                        "allowedProbability"
                      )}
                      disabled={
                        !store.config.finalOrgasmRandom ||
                        !store.config.finalOrgasmAllowed
                      }
                      endAdornment={
                        <InputAdornment position="end">%</InputAdornment>
                      }
                    />
                  </FormControl>
                  <FormHelperText>{errors.allowedProbability}</FormHelperText>
                </Grid>
              </Grid>
              <Grid container direction={"column"}>
                <Grid item xs={10}>
                  <FormControlLabel
                    title={"Whether you will be denied in the end"}
                    control={
                      <Switch
                        checked={store.config.finalOrgasmDenied}
                        onChange={handleFinalOrgasmGroupCheckChange(
                          "finalOrgasmDenied"
                        )}
                        value="finalOrgasmDenied"
                      />
                    }
                    label="Denied"
                  />
                </Grid>
                <Grid item xs={10}>
                  <FormControl
                    className={classes.control}
                    required={!!store.config.finalOrgasmRandom}
                    error={
                      !!errors.deniedProbability ||
                      (!!store.config.finalOrgasmRandom && !!errors.finalOrgasm)
                    }
                  >
                    <InputLabel>Probability</InputLabel>
                    <Input
                      id="deniedProbability"
                      value={store.config.deniedProbability}
                      onChange={handleFinalOrgasmGroupCheck(
                        "deniedProbability"
                      )}
                      disabled={
                        !store.config.finalOrgasmRandom ||
                        !store.config.finalOrgasmDenied
                      }
                      endAdornment={
                        <InputAdornment position="end">%</InputAdornment>
                      }
                    />
                    <FormHelperText>{errors.deniedProbability}</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container direction={"column"}>
                <Grid item xs={10}>
                  <FormControlLabel
                    title={"Whether you will be asked to ruin in the end"}
                    control={
                      <Switch
                        checked={store.config.finalOrgasmRuined}
                        onChange={handleFinalOrgasmGroupCheckChange(
                          "finalOrgasmRuined"
                        )}
                        value="finalOrgasmRuined"
                      />
                    }
                    label="Ruined"
                  />
                </Grid>
                <Grid item xs={10}>
                  <FormControl
                    className={classes.control}
                    required={!!store.config.finalOrgasmRandom}
                    error={
                      !!errors.ruinedProbability ||
                      (!!store.config.finalOrgasmRandom && !!errors.finalOrgasm)
                    }
                  >
                    <InputLabel>Probability</InputLabel>
                    <Input
                      id="ruinedProbability"
                      value={store.config.ruinedProbability}
                      onChange={handleFinalOrgasmGroupCheck(
                        "ruinedProbability"
                      )}
                      disabled={
                        !store.config.finalOrgasmRandom ||
                        !store.config.finalOrgasmRuined
                      }
                      endAdornment={
                        <InputAdornment position="end">%</InputAdornment>
                      }
                    />
                    <FormHelperText>{errors.ruinedProbability}</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControlLabel
                  title={
                    "Chooses at random from the left hand side selected game ends"
                  }
                  control={
                    <Switch
                      checked={store.config.finalOrgasmRandom}
                      onChange={handleFinalOrgasmGroupCheckChange(
                        "finalOrgasmRandom"
                      )}
                      value="finalOrgasmRandom"
                    />
                  }
                  label={"Random (applies to selected)"}
                />
              </Grid>
              {errors.finalOrgasmRandom ? (
                <FormHelperText>{errors.finalOrgasmRandom}</FormHelperText>
              ) : (
                <FormHelperText>{errors.finalOrgasm}</FormHelperText>
              )}
            </Grid>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={10}>
        <Grid item xs={12} md={4}>
          <FormControlLabel
            control={
              <Switch
                checked={store.config.postOrgasmTorture}
                onChange={handleCheckChange("postOrgasmTorture")}
                value="postOrgasmTorture"
              />
            }
            label="Post Orgasm Torture"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl
            className={classes.control}
            disabled={!store.config.postOrgasmTorture}
            error={!!errors.postOrgasmTortureMinimumTime}
          >
            <InputLabel>Post Orgasm Torture Minimum Time</InputLabel>
            <Input
              id="postOrgasmTortureMinimumTime"
              value={store.config.postOrgasmTortureMinimumTime}
              onChange={handleChange("postOrgasmTortureMinimumTime", Number)}
              fullWidth
              type="number"
              inputProps={{ step: "1", min: "3" }}
              endAdornment={
                <InputAdornment position="end">seconds</InputAdornment>
              }
            />
            <FormHelperText>
              {errors.postOrgasmTortureMinimumTime}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl
            className={classes.control}
            disabled={!store.config.postOrgasmTorture}
            error={!!errors.postOrgasmTortureMaximumTime}
          >
            <InputLabel>Post Orgasm Torture Maximum Time</InputLabel>
            <Input
              id="postOrgasmTortureMaximumTime"
              value={store.config.postOrgasmTortureMaximumTime}
              onChange={handleChange("postOrgasmTortureMaximumTime", Number)}
              fullWidth
              type="number"
              inputProps={{ step: "1", min: "5" }}
              endAdornment={
                <InputAdornment position="end">seconds</InputAdornment>
              }
            />
            <FormHelperText>
              {errors.postOrgasmTortureMaximumTime}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl
            title={
              "specify a number of ruins you will have to reach before the Game End"
            }
            className={classes.control}
            error={!!errors.minimumRuinedOrgasms}
          >
            <InputLabel>Minimum additional Ruined Orgasms</InputLabel>
            <Input
              id="minimumRuinedOrgasms"
              value={store.config.minimumRuinedOrgasms}
              onChange={handleChange("minimumRuinedOrgasms", Number)}
              fullWidth
              type="number"
              inputProps={{ step: "1", min: "0" }}
            />
            <FormHelperText>{errors.minimumRuinedOrgasms}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl
            title={
              "specify a number of ruins you may have to reach before the Game End"
            }
            className={classes.control}
            error={!!errors.maximumRuinedOrgasms}
          >
            <InputLabel>Maximum Ruined Orgasms</InputLabel>
            <Input
              id="maximumRuinedOrgasms"
              value={store.config.maximumRuinedOrgasms}
              onChange={handleChange("maximumRuinedOrgasms", Number)}
              fullWidth
              type="number"
              inputProps={{ step: "1", min: "0" }}
            />
            <FormHelperText>{errors.maximumRuinedOrgasms}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl
            className={classes.control}
            error={!!errors.ruinCooldown}
          >
            <InputLabel>Ruin Cooldown</InputLabel>
            <Input
              id="ruinCooldown"
              value={store.config.ruinCooldown}
              onChange={handleChange("ruinCooldown", Number)}
              fullWidth
              type="number"
              inputProps={{ step: "1", min: "0" }}
              endAdornment={
                <InputAdornment position="end">seconds</InputAdornment>
              }
            />
            <FormHelperText>{errors.ruinCooldown}</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    </Group>
  );
}
