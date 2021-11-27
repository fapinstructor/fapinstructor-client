import { connect } from "react-redux";

import { State } from "@/stores/rootReducer";
import { selectProfile } from "@/stores/currentUser";

import GamesTable from "./GamesTable";

const mapStateToProps = (state: State) => ({
  createdBy: selectProfile(state)?.id,
});

export default connect(mapStateToProps)(GamesTable);
