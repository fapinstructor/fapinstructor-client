import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import SkipNextIcon from "@material-ui/icons/SkipNext";

export type SkipButtonProps = {
  onClick: () => void;
};

export default function SkipButton({ onClick }: SkipButtonProps) {
  return (
    <Tooltip title="Skip" placement="bottom">
      <IconButton color="inherit" onClick={onClick}>
        <SkipNextIcon />
      </IconButton>
    </Tooltip>
  );
}
