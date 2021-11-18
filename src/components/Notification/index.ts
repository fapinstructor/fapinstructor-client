import { connect } from "react-redux";

import { dismissNotification } from "@/common/store/notifications";

import Notification from "./Notification";

export default connect(null, {
  dismissNotification,
})(Notification);
