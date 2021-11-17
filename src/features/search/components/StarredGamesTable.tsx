import { connect } from "react-redux";

import { State } from "@/common/store/rootReducer";
import { selectProfile } from "@/common/store/currentUser";

import GamesTable from "./GamesTable";

const mapStateToProps = (state: State) => ({
  starredBy: selectProfile(state)?.id,
});

export default connect(mapStateToProps)(GamesTable);
