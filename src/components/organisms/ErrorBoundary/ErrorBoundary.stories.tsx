import { Story, Meta } from "@storybook/react";
import ComponentWithException, {
  ComponentWithExceptionProps,
} from "@/test/components/ComponentWithException";

import ErrorBoundary from "./ErrorBoundary";

export default {
  title: "organisms/ErrorBoundary",
  component: ErrorBoundary,
} as Meta;

const Template: Story<ComponentWithExceptionProps> = (args) => (
  <ErrorBoundary>
    <ComponentWithException {...args} />
  </ErrorBoundary>
);

export const Fail = Template.bind({});
Fail.args = {
  fail: true,
};

export const Success = Template.bind({});
Success.args = {
  fail: false,
};
