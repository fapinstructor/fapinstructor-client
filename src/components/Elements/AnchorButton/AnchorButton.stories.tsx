import { Story, Meta } from "@storybook/react";

import { AnchorButton, AnchorButtonProps } from "./AnchorButton";

export default {
  title: "elements/AnchorButton",
  component: AnchorButton,
} as Meta;

const Template: Story<AnchorButtonProps> = (args) => (
  <AnchorButton {...args}>Anchor Button</AnchorButton>
);

export const Standard = Template.bind({});
Standard.args = {
  href: "https://example.com",
};
