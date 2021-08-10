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

type EdgingStepProps = {
  values: {
    minimumEdges: number;
    edgeCooldown: number;
    edgeFrequency: number;
  };
  errors: {
    minimumEdges: string;
    edgeCooldown: string;
    edgeFrequency: string;
  };
  handleChange: (name: string, cast?: unknown) => (event: unknown) => unknown;
};

export default function EdgingStep({
  values,
  errors,
  handleChange,
}: EdgingStepProps) {
  const classes = useStyles();

  return (
    <Group title="Edging">
      <Grid container spacing={10}>
        <Grid item xs={12} md={3}>
          <FormControl
            className={classes.control}
            error={!!errors.minimumEdges}
            title={
              "Specify how many edges you will have to fulfill before the game may end"
            }
          >
            <InputLabel>Minimum Edges</InputLabel>
            <Input
              id="minimumEdges"
              value={values.minimumEdges}
              onChange={handleChange("minimumEdges", Number)}
              fullWidth
              type="number"
              inputProps={{ step: "1", min: "0" }}
            />
            <FormHelperText>{errors.minimumEdges}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl
            className={classes.control}
            error={!!errors.edgeCooldown}
          >
            <InputLabel>Edge Cooldown</InputLabel>
            <Input
              id="edgeCooldown"
              value={values.edgeCooldown}
              onChange={handleChange("edgeCooldown", Number)}
              fullWidth
              type="number"
              inputProps={{ step: "1", min: "0" }}
              endAdornment={
                <InputAdornment position="end">seconds</InputAdornment>
              }
            />
            <FormHelperText>{errors.edgeCooldown}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl
            className={classes.control}
            error={!!errors.edgeFrequency}
          >
            <InputLabel>Increase Edge Frequency</InputLabel>
            <Input
              id="edgeFrequency"
              value={values.edgeFrequency}
              onChange={handleChange("edgeFrequency", Number)}
              fullWidth
              type="number"
              inputProps={{ step: "1", min: "0" }}
              endAdornment={<InputAdornment position="end">%</InputAdornment>}
            />
            <FormHelperText>{errors.edgeFrequency}</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    </Group>
  );
}
