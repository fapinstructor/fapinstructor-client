import { Story, Meta } from "@storybook/react";
import Auth0TestProvider, { Auth } from "@/AuthProvider/Auth0TestProvider";
import { user } from "@/test/mocks/user_mock_objects";

import NavBar from "./NavBar";

export default {
  title: "organisms/NavBar",
  component: NavBar,
} as Meta;

type Args = {
  auth?: Auth;
};

const Template: Story<Args> = (args) => (
  <Auth0TestProvider {...args.auth}>
    <NavBar />
  </Auth0TestProvider>
);

export const SignedIn = Template.bind({});
SignedIn.args = {
  auth: {
    user,
  },
};

export const SignedOut = Template.bind({});
