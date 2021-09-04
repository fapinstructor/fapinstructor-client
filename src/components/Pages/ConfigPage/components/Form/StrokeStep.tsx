import { Grid } from "@material-ui/core";

import Group from "components/molecules/Group";
import GripStrengthField from "../GripStrengthField";
import StrokeSpeedField from "../StrokeSpeedField";

export default function StrokeStep() {
  return (
    <Group title="Stroke">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <StrokeSpeedField />
        </Grid>
        <Grid item xs={8} />
        <Grid item xs={4}>
          <GripStrengthField />
        </Grid>
        <Grid item xs={8} />
      </Grid>
    </Group>
  );
}
