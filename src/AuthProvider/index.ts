import { connect } from "react-redux";
import { fetchProfile } from "common/store/currentUser";
import Auth0Provider, { useAuth0, authClient, User } from "./Auth0Provider";

export type { User };
export { useAuth0, authClient };

export default connect(null, { fetchProfile })(Auth0Provider);
