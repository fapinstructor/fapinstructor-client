import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";

type SkipPreviousButtonProps = {
  onClick: () => void;
};

export default function SkipPreviousButton({
  onClick,
}: SkipPreviousButtonProps) {
  return (
    <Tooltip title="Previous Image [Left Arrow]" placement="bottom">
      <IconButton color="inherit" onClick={onClick}>
        <SkipPreviousIcon />
      </IconButton>
    </Tooltip>
  );
}
