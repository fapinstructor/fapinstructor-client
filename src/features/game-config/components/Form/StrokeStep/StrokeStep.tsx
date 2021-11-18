import { Group } from "@/components/Group";

import GripStrengthField from "./components/GripStrengthField";
import StrokeSpeedField from "./components/StrokeSpeedField";

export default function StrokeStep() {
  return (
    <Group title="Stroke">
      <StrokeSpeedField />
      <GripStrengthField />
    </Group>
  );
}
