import type { Meta, Story } from "@storybook/react/types-6-0";
import noop from "test/noop";

import TaskGroup from "./TaskGroup";

export default {
  title: "App/Pages/ConfigPage/TaskGroup",
  component: TaskGroup,
} as Meta;

type Args = React.ComponentProps<typeof TaskGroup>;

const Template: Story<Args> = (args) => <TaskGroup {...args} />;

const defaultArgs = {
  label: "List of tasks",
  tasks: {
    task1: "Task 1",
    task2: "Task 2",
    task3: "Task 3",
  },
  selectedTasks: ["task1"],
  onToggleTask: noop,
  onToggleAllTasks: noop,
};

export const Standard = Template.bind({});
Standard.args = {
  ...defaultArgs,
};
