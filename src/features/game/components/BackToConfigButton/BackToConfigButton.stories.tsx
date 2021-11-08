import { Story, Meta } from "@storybook/react";

import { BackToConfigButton } from "./BackToConfigButton";

export default {
  title: "molecules/BackToConfigButton",
  component: BackToConfigButton,
} as Meta;

const Template: Story = () => <BackToConfigButton />;

export const Standard = Template.bind({});
