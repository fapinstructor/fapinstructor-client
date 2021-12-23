import { Story, Meta } from "@storybook/react";

import { DeleteProfileModal } from "./DeleteProfileModal";

export default {
  title: "features/profile/DeleteProfileModal",
  component: DeleteProfileModal,
} as Meta;

type Args = React.ComponentProps<typeof DeleteProfileModal>;

const Template: Story<Args> = (args) => <DeleteProfileModal {...args} />;

const defaultArgs = {
  open: true,
};

export const Standard = Template.bind({});
Standard.args = {
  ...defaultArgs,
};
