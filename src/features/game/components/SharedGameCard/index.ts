import { connect } from "react-redux";
import { State } from "@/common/store/rootReducer";
import {
  selectLoading,
  selectGame,
  selectError,
  fetchGame,
} from "@/common/store/currentGame";
import { appendGameHistory, selectProfile } from "@/common/store/currentUser";
import SharedGameCard from "./SharedGameCard";

const mapStateToProps = (state: State) => ({
  loading: selectLoading(state),
  error: selectError(state),
  game: selectGame(state),
  profile: selectProfile(state),
});

export default connect(mapStateToProps, { fetchGame, appendGameHistory })(
  SharedGameCard
);
