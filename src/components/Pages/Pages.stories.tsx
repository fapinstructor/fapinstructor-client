// TODO: Commented out pages that need to be refactored to work properly with testing
import type { Meta, Story } from "@storybook/react/types-6-0";
import Auth0TestProvider, { Auth } from "AuthProvider/Auth0TestProvider";
import { user } from "test/mocks/user_mock_objects";

import Pages from "./Pages";

export default {
  title: "App/Pages",
  component: Pages,
} as Meta;

type Args = {
  route: string;
  auth?: Auth;
};

const Template: Story<Args> = (args) => (
  <Auth0TestProvider {...args.auth}>
    <Pages />
  </Auth0TestProvider>
);

const defaultArgs = {
  auth: {
    user,
  },
};

// export const ConfigPage = Template.bind({});
// ConfigPage.args = {
//   ...defaultArgs,
//   route: "/",
// };

// export const SearchPage = Template.bind({});
// SearchPage.args = {
//   ...defaultArgs,
//   route: "/games",
// };

// export const ChangeLogPage = Template.bind({});
// ChangeLogPage.args = {
//   ...defaultArgs,
//   route: "/changelog",
// };

// export const EndGamePage = Template.bind({});
// EndGamePage.args = {
//   ...defaultArgs,
//   route: "/endgame",
// };

export const Profile = Template.bind({});
Profile.args = {
  ...defaultArgs,
  route: "/profile",
};

export const LoadingPage = Template.bind({});
LoadingPage.args = {
  auth: {
    user,
    isLoading: true,
    isAuthenticated: false,
  },
  route: "/profile",
};

export const UnauthorizedPage = Template.bind({});
UnauthorizedPage.args = {
  auth: {
    isLoading: false,
    isAuthenticated: false,
  },
  route: "/profile",
};
