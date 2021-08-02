import type { Meta, Story } from "@storybook/react/types-6-0";
import noop from "test/noop";

import Task from "./Task";

export default {
  title: "App/Pages/ConfigPage/Task",
  component: Task,
} as Meta;

type Args = React.ComponentProps<typeof Task>;

const Template: Story<Args> = (args) => <Task {...args} />;

const defaultArgs = {
  id: "id#1",
  label: "Task #1",
  checked: true,
  disabled: false,
  onTaskToggle: noop,
};

export const Standard = Template.bind({});
Standard.args = {
  ...defaultArgs,
};
