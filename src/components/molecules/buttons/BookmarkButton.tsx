import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import BookmarkIcon from "@material-ui/icons/Bookmark";

export type BookmarkButtonProps = {
  onClick: () => void;
};

export default function BookmarkButton({ onClick }: BookmarkButtonProps) {
  return (
    <Tooltip title="Bookmark" placement="bottom">
      <IconButton color="inherit" onClick={onClick}>
        <BookmarkIcon />
      </IconButton>
    </Tooltip>
  );
}
