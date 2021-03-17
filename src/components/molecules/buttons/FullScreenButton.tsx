import React from "react";
import IconButton from "@material-ui/core/IconButton";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";

function isFullScreenSupported() {
  const doc = window.document;
  const docEl = doc.documentElement;

  const requestFullScreen =
    docEl.requestFullscreen ||
    // @ts-expect-error
    docEl.mozRequestFullScreen ||
    // @ts-expect-error
    docEl.webkitRequestFullScreen ||
    // @ts-expect-error
    docEl.msRequestFullscreen;

  return Boolean(requestFullScreen);
}

function toggleFullScreen() {
  const doc = window.document;
  const docEl = doc.documentElement;

  const requestFullScreen =
    docEl.requestFullscreen ||
    // @ts-expect-error
    docEl.mozRequestFullScreen ||
    // @ts-expect-error
    docEl.webkitRequestFullScreen ||
    // @ts-expect-error
    docEl.msRequestFullscreen;

  const cancelFullScreen =
    doc.exitFullscreen ||
    // @ts-expect-error
    doc.mozCancelFullScreen ||
    // @ts-expect-error
    doc.webkitExitFullscreen ||
    // @ts-expect-error
    doc.msExitFullscreen;

  if (
    !doc.fullscreenElement &&
    // @ts-expect-error
    !doc.mozFullScreenElement &&
    // @ts-expect-error
    !doc.webkitFullscreenElement &&
    // @ts-expect-error
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
    // @ts-expect-error
    !doc.mozFullScreenElement &&
    // @ts-expect-error
    !doc.webkitFullscreenElement &&
    // @ts-expect-error
    !doc.msFullscreenElement
  ) {
    return false;
  }
  return true;
}

export default function FullScreenButton() {
  const fullscreen = isFullScreen();

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
