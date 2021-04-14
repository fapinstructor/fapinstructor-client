import React from "react";
import { Story } from "@storybook/react";

import DeleteProfileModal from "./DeleteProfileModal";

export default {
  title: "molecules/DeleteProfileModal",
  component: DeleteProfileModal,
};

type Args = React.ComponentProps<typeof DeleteProfileModal>;

const Template: Story<Args> = (args) => <DeleteProfileModal {...args} />;

const defaultArgs = {
  open: true,
};

export const Standard = Template.bind({});
Standard.args = {
  ...defaultArgs,
};
