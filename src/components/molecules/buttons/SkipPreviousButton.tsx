import React, { useCallback } from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import useWindowEvent from "hooks/useWindowEvent";
import { MediaService } from "game/xstate/services";

type SkipPreviousButtonProps = {
  onClick: () => void;
};

export default function SkipPreviousButton({
  onClick,
}: SkipPreviousButtonProps) {
  const handleKeydown = useCallback((event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      MediaService.previousLink();
    }
  }, []);
  useWindowEvent("keydown", handleKeydown);

  return (
    <Tooltip title="Previous Image [Left Arrow]" placement="bottom">
      <IconButton color="inherit" onClick={onClick}>
        <SkipPreviousIcon />
      </IconButton>
    </Tooltip>
  );
}
