import { Grid } from "@material-ui/core";

import Group from "components/molecules/Group";
import GameLengthField from "../GameLengthField";

export default function TimeStep() {
  return (
    <Group title="Game Length">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <GameLengthField />
        </Grid>
        <Grid item xs={8} />
      </Grid>
    </Group>
  );
}
