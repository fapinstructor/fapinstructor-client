import Group from "components/molecules/Group";
import CooldownField from "../components/CooldownField";
import MinimumEdgesField from "./components/MinimumEdgesField";
import EdgeFrequencyField from "./components/EdgeFrequencyField";

export default function EdgingStep() {
  return (
    <Group title="Edging">
      <MinimumEdgesField />
      <EdgeFrequencyField />
      <CooldownField
        name="edgeCooldown"
        label="Edge Cooldown"
        helperText="Duration to rest before the game continues."
      />
    </Group>
  );
}
