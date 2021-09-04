import { Grid } from "@material-ui/core";

import Group from "components/molecules/Group";
import CooldownField from "../CooldownField";
import MinimumEdgesField from "../MinimumEdgesField";
import EdgeFrequencyField from "../EdgeFrequencyField";

export default function EdgingStep() {
  return (
    <Group title="Edging">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <MinimumEdgesField />
        </Grid>
        <Grid item xs={8} />
        <Grid item xs={4}>
          <CooldownField
            name="edgeCooldown"
            label="Edge Cooldown"
            helperText="Length of time to rest before the game continues."
          />
        </Grid>
        <Grid item xs={8} />
        <Grid item xs={4}>
          <EdgeFrequencyField />
        </Grid>
        <Grid item xs={4} />
      </Grid>
    </Group>
  );
}
