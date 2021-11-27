import { connect } from "react-redux";

import { State } from "@/stores/rootReducer";
import { appendGameHistory, selectProfile } from "@/stores/currentUser";

import SharedGameCard from "./SharedGameCard";

const mapStateToProps = (state: State) => ({
  profile: selectProfile(state),
});

export default connect(mapStateToProps, { appendGameHistory })(SharedGameCard);
