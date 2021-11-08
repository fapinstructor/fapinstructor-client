import { useCallback } from "react";
import { createNotification } from "@/game/engine/notification";
import { Severity } from "@/common/store/notifications";
import { Tooltip, IconButton } from "@material-ui/core";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import useWindowEvent from "@/hooks/useWindowEvent";
import {
  isFullScreen,
  isFullScreenSupported,
  toggleFullScreen,
} from "@/game/utils/fullscreen";

export function FullScreenButton() {
  const fullscreen = isFullScreen();

  const handleKeydown = useCallback((event: KeyboardEvent) => {
    if (event.key === "f" && !event.repeat) {
      toggleFullScreen().catch(() => {
        createNotification({
          message: "An error occurred trying to fullscreen or minimize.",
          duration: -1,
          severity: Severity.ERROR,
        });
      });
    }
  }, []);
  useWindowEvent("keydown", handleKeydown);

  return isFullScreenSupported() ? (
    <Tooltip title="Toggle fullscreen [f]" placement="bottom">
      <span>
        {fullscreen && (
          <IconButton color="inherit" onClick={toggleFullScreen}>
            <FullscreenExitIcon />
          </IconButton>
        )}
        {!fullscreen && (
          <IconButton color="inherit" onClick={toggleFullScreen}>
            <FullscreenIcon />
          </IconButton>
        )}
      </span>
    </Tooltip>
  ) : null;
}
