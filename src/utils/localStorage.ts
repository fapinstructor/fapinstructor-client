export function loadState(key: string) {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch {
    return undefined;
  }
}

export function saveState(key: string, state: Serializable) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch {
    // ignore write errors
  }
}

export function removeState(key: string) {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore remove errors
  }
}
