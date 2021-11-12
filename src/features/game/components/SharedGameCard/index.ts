import { connect } from "react-redux";

import { State } from "@/common/store/rootReducer";
import { appendGameHistory, selectProfile } from "@/common/store/currentUser";

import SharedGameCard from "./SharedGameCard";

const mapStateToProps = (state: State) => ({
  profile: selectProfile(state),
});

export default connect(mapStateToProps, { appendGameHistory })(SharedGameCard);
