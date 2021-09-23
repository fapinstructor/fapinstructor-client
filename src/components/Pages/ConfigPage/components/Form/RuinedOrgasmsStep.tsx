import Group from "components/molecules/Group";

import RuinedOrgasmsRangeField from "../RuinedOrgasmsRangeField";
import CooldownField from "../CooldownField";

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
