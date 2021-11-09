import { connect } from "react-redux";


import { State } from "@/common/store/rootReducer";
import { selectNotifications } from "@/common/store/notifications";

import NotificationManager from "./NotificationManager";


const mapStateToProps = (state: State) => ({
  notifications: selectNotifications(state),
});

export default connect(mapStateToProps)(NotificationManager);
