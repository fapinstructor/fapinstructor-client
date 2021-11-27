import { connect } from "react-redux";

import { State } from "@/stores/rootReducer";
import { selectNotifications } from "@/stores/notifications";

import NotificationManager from "./NotificationManager";

const mapStateToProps = (state: State) => ({
  notifications: selectNotifications(state),
});

export default connect(mapStateToProps)(NotificationManager);
