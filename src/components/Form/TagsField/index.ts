import { connect } from "react-redux";
import { State } from "@/common/store/rootReducer";
import { fetchTags, selectLoading, selectTags } from "@/common/store/tags";
import TagsField from "./TagsField";

const mapStateToProps = (state: State) => ({
  tags: selectTags(state),
  loading: selectLoading(state),
});

export default connect(mapStateToProps, {
  fetchTags,
})(TagsField);
