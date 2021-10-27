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

export function isFullScreenSupported() {
  const doc = window.document;
  const docEl = doc.documentElement;

  const requestFullScreen =
    docEl.requestFullscreen ||
    docEl.mozRequestFullScreen ||
    docEl.webkitRequestFullScreen ||
    docEl.msRequestFullscreen;

  return Boolean(requestFullScreen);
}

export function isFullScreen() {
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

export function toggleFullScreen() {
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
    return requestFullScreen.call(docEl);
  } else {
    return cancelFullScreen.call(doc);
  }
}
