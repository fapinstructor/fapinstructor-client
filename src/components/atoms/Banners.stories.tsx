import { Meta } from "@storybook/react";

import EroFightsBanner from "./EroFightsBanner";
import SupportSiteBanner from "./SupportSiteBanner";

export default {
  title: "atoms/Banners",
  component: EroFightsBanner,
} as Meta;

export const LargeEroFightsBanner = () => <EroFightsBanner />;
export const LargeSupportSiteBanner = () => <SupportSiteBanner />;
