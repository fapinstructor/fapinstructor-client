import Group from "components/molecules/Group";
import GripStrengthField from "../GripStrengthField";
import StrokeSpeedField from "../StrokeSpeedField";

export default function StrokeStep() {
  return (
    <Group title="Stroke">
      <StrokeSpeedField />
      <GripStrengthField />
    </Group>
  );
}
