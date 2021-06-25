import React, { useCallback } from "react";
import IconButton from "@material-ui/core/IconButton";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import useWindowEvent from "hooks/useWindowEvent";

// Add full-screen definitions across vendors
declare global {
  interface HTMLElement {
    mozRequestFullScreen: boolean;
    webkitRequestFullScreen: boolean;
    msRequestFullscreen: boolean;
  }
  interface Document {
    mozCancelFullScreen: Promise<void>;
    webkitExitFullscreen: Promise<void>;
    msExitFullscreen: Promise<void>;
    mozFullScreenElement: boolean;
    webkitFullscreenElement: boolean;
    msFullscreenElement: boolean;
  }
}

function isFullScreenSupported() {
  const doc = window.document;
  const docEl = doc.documentElement;

  const requestFullScreen =
    docEl.requestFullscreen ||
    docEl.mozRequestFullScreen ||
    docEl.webkitRequestFullScreen ||
    docEl.msRequestFullscreen;

  return Boolean(requestFullScreen);
}

function toggleFullScreen() {
  const doc = window.document;
  const docEl = doc.documentElement;

  const requestFullScreen =
    docEl.requestFullscreen ||
    docEl.mozRequestFullScreen ||
    docEl.webkitRequestFullScreen ||
    docEl.msRequestFullscreen;

  const cancelFullScreen =
    doc.exitFullscreen ||
    doc.mozCancelFullScreen ||
    doc.webkitExitFullscreen ||
    doc.msExitFullscreen;

  if (
    !doc.fullscreenElement &&
    !doc.mozFullScreenElement &&
    !doc.webkitFullscreenElement &&
    !doc.msFullscreenElement
  ) {
    requestFullScreen.call(docEl);
  } else {
    cancelFullScreen.call(doc);
  }
}

function isFullScreen() {
  const doc = window.document;

  if (
    !doc.fullscreenElement &&
    !doc.mozFullScreenElement &&
    !doc.webkitFullscreenElement &&
    !doc.msFullscreenElement
  ) {
    return false;
  }
  return true;
}

export default function FullScreenButton() {
  const fullscreen = isFullScreen();

  const handleKeydown = useCallback((event: KeyboardEvent) => {
    if (event.key === "f") {
      toggleFullScreen();
    }
  }, []);
  useWindowEvent("keydown", handleKeydown);

  return isFullScreenSupported() ? (
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
  ) : null;
}
