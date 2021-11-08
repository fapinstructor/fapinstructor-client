import { useCallback } from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import useWindowEvent from "@/hooks/useWindowEvent";
import { MediaService } from "@/game/xstate/services";

export function SkipPreviousButton() {
  const handleKeydown = useCallback((event: KeyboardEvent) => {
    if (event.key === "ArrowLeft" && !event.repeat) {
      MediaService.previousLink();
    }
  }, []);
  useWindowEvent("keydown", handleKeydown);

  return (
    <Tooltip title="Previous Image [Left Arrow]" placement="bottom">
      <IconButton
        color="inherit"
        onClick={() => {
          MediaService.previousLink();
        }}
      >
        <SkipPreviousIcon />
      </IconButton>
    </Tooltip>
  );
}
