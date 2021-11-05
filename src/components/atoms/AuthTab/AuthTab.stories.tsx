import { Story, Meta } from "@storybook/react";
import CreateIcon from "@material-ui/icons/Create";

import Auth0TestProvider, {
  Auth,
} from "@/providers/AuthProvider/Auth0TestProvider";
import { user } from "@/test/mocks/user_mock_objects";

import AuthTab, { AuthTabProps } from "./AuthTab";

export default {
  title: "atoms/AuthTab",
  component: AuthTab,
} as Meta;

type Args = AuthTabProps & {
  auth?: Auth;
};

const Template: Story<Args> = ({ auth, ...args }) => (
  <Auth0TestProvider {...auth}>
    <AuthTab {...args} />
  </Auth0TestProvider>
);

const defaultArgs = {
  label: "Created Games",
  icon: <CreateIcon />,
  auth: {
    user,
  },
};

export const UnauthenticatedTab = Template.bind({});
UnauthenticatedTab.args = {
  ...defaultArgs,
  auth: {
    isLoading: false,
    isAuthenticated: false,
  },
};

export const AuthenticatedTab = Template.bind({});
AuthenticatedTab.args = {
  ...defaultArgs,
};
