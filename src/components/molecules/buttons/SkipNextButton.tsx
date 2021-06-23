import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import SkipNextIcon from "@material-ui/icons/SkipNext";

export type SkipButtonProps = {
  onClick: () => void;
};

export default function SkipNextButton({ onClick }: SkipButtonProps) {
  return (
    <Tooltip title="Next Image [Right Arrow]" placement="bottom">
      <IconButton color="inherit" onClick={onClick}>
        <SkipNextIcon />
      </IconButton>
    </Tooltip>
  );
}
