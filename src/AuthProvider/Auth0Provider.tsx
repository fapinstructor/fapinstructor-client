// TODO: Once config/env types are proper, remove this
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Auth0Provider,
  useAuth0,
  Auth0ContextInterface,
  AppState,
} from "@auth0/auth0-react";
import config from "config";

type Auth0ProviderProps = {
  children: JSX.Element;
  fetchProfile: (userId: string) => void;
};

// Expose the auth client so it can be used outside of React
const authClient: { current?: Auth0ContextInterface; error?: Error } = {
  current: undefined,
  error: undefined,
};
export { authClient };
export { useAuth0 };

export default function AppAuth0Provider({
  children,
  fetchProfile,
}: Auth0ProviderProps) {
  const history = useHistory();

  const onRedirectCallback = (appState: AppState) => {
    history.push(appState.returnTo || window.location.pathname);
  };

  function ApplyAuth(): JSX.Element {
    const auth0 = useAuth0();
    authClient.current = auth0;

    useEffect(() => {
      if (auth0.user?.sub && auth0.isAuthenticated) {
        fetchProfile(auth0.user.sub);
      }
    }, [auth0.user, auth0.isAuthenticated]);

    return children;
  }

  /**
   * Auth requires sessionStorage and will fail if it doesn't exist.
   * Catch the error and prevent logins instead of
   * letting the Auth0Provider blow up.
   */
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    window.sessionStorage;
  } catch (error) {
    authClient.error = error;
    return children;
  }

  return (
    <Auth0Provider
      domain={config.auth0Domain}
      clientId={config.auth0ClientId}
      audience={config.auth0Audience}
      useRefreshTokens={true}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <ApplyAuth />
    </Auth0Provider>
  );
}
