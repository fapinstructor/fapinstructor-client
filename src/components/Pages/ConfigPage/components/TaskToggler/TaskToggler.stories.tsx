import type { Meta, Story } from "@storybook/react/types-6-0";
import noop from "test/noop";

import TaskToggler from "./TaskToggler";

export default {
  title: "App/Pages/ConfigPage/TaskToggler",
  component: TaskToggler,
} as Meta;

type Args = React.ComponentProps<typeof TaskToggler>;

const Template: Story<Args> = (args) => <TaskToggler {...args} />;

const defaultArgs = {
  id: "id#1",
  label: "Task #1",
  checked: true,
  disabled: false,
  onToggleTask: noop,
};

export const Standard = Template.bind({});
Standard.args = {
  ...defaultArgs,
};
