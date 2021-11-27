import { connect } from "react-redux";

import { dismissNotification } from "@/stores/notifications";

import Notification from "./Notification";

export default connect(null, {
  dismissNotification,
})(Notification);
