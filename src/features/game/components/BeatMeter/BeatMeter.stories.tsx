import { Meta } from "@storybook/react";

import { BeatMeter } from "./BeatMeter";
import { CircleFlash, Circle, Dot, HR, Bar } from "./styled-components";

export default {
  title: "organisms/BeatMeter",
  component: BeatMeter,
} as Meta;

export const StandardDot = () => <Dot />;

export const StandardHR = () => <HR />;

export const StandardCircle = () => <Circle />;

export const StandardFlash = () => <CircleFlash />;

export const StandardBar = () => <Bar />;
