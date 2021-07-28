import BookmarkIcon from "@material-ui/icons/Bookmark";
import { IconButton, Tooltip } from "@material-ui/core";
import { useDispatch } from "react-redux";

import store from "store";
import { createNotification } from "common/store/notifications";
import { useMediaService } from "game/xstate/services";

export type BookmarkButtonProps = {
  onClick: () => void;
};

export default function BookmarkButton() {
  const dispatch = useDispatch();
  const [{ context: media }] = useMediaService();

  const bookmark = () => {
    const link = media.links[media.linkIndex];

    dispatch(
      createNotification({
        message: "Bookmarked",
        dismissible: true,
      })
    );

    if (link && link.sourceLink) {
      store.game.bookmarks.push({
        href: link.directLink,
        src: link.sourceLink,
      });
    }
  };

  return (
    <Tooltip title="Bookmark" placement="bottom">
      <IconButton color="inherit" onClick={bookmark}>
        <BookmarkIcon />
      </IconButton>
    </Tooltip>
  );
}
