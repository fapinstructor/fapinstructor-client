import { Meta } from "@storybook/react";

import HomeButton from "./HomeButton";

export default {
  title: "atoms/HomeButton",
  component: HomeButton,
} as Meta;

const Template = () => <HomeButton />;

export const Standard = Template.bind({});
