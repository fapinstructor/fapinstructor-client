import Group from "components/molecules/Group";

import CooldownField from "../components/CooldownField";
import RuinedOrgasmsRangeField from "./components/RuinedOrgasmsRangeField";

export default function RuinedOrgasmsStep() {
  return (
    <Group title="Ruined Orgasms">
      <RuinedOrgasmsRangeField />
      <CooldownField
        name="ruinCooldown"
        label="Ruin Cooldown"
        helperText="Duration to rest before the game continues."
      />
    </Group>
  );
}
