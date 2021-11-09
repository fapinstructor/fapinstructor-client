import { connect } from "react-redux";


import { State } from "@/common/store/rootReducer";
import {
  selectLoading,
  selectGames,
  selectPagination,
  selectError,
  searchGames,
} from "@/common/store/games";

import GamesTable from "./GamesTable";


const mapStateToProps = (state: State) => ({
  loading: selectLoading(state),
  error: selectError(state),
  games: selectGames(state),
  pagination: selectPagination(state),
});

export default connect(mapStateToProps, { searchGames })(GamesTable);
