import Group from "components/molecules/Group";
import CooldownField from "../CooldownField";
import MinimumEdgesField from "../MinimumEdgesField";
import EdgeFrequencyField from "../EdgeFrequencyField";

export default function EdgingStep() {
  return (
    <Group title="Edging">
      <MinimumEdgesField />
      <EdgeFrequencyField />
      <CooldownField
        name="edgeCooldown"
        label="Edge Cooldown"
        helperText="Length of time to rest before the game continues."
      />
    </Group>
  );
}
