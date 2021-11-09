
import { Group } from "@/components/Group";

import CooldownField from "../components/CooldownField";

import RuinedOrgasmsRangeField from "./components/RuinedOrgasmsRangeField";


export default function RuinedOrgasmsStep() {
  return (
    <Group
      title="Ruined Orgasms"
      tooltip="Masturbate all the way to orgasm, but just before you start cumming stop all stimulation."
    >
      <RuinedOrgasmsRangeField />
      <CooldownField
        name="ruinCooldown"
        label="Ruin Cooldown"
        helperText="Duration to rest before the game continues."
      />
    </Group>
  );
}
