import { connect } from "react-redux";

import { fetchProfile } from "@/stores/currentUser";

import Auth0Provider, { useAuth0, authClient } from "./Auth0Provider";

export { useAuth0, authClient };

export default connect(null, { fetchProfile })(Auth0Provider);
