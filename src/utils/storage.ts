const storagePrefix = "fapinstructor_";

export const storage = {
  // TODO: If an initialState is passed in, then we shouldn't type the return as possibly 'undefined'
  getItem<TState>(key: string, initialState?: TState): TState | undefined {
    try {
      const serializedState = localStorage.getItem(`${storagePrefix}${key}`);

      if (serializedState === null) {
        return initialState;
      }
      return JSON.parse(serializedState);
    } catch {
      return initialState;
    }
  },
  setItem(key: string, state: Serializable) {
    try {
      const serializedState = JSON.stringify(state);

      localStorage.setItem(`${storagePrefix}${key}`, serializedState);
    } catch {
      // Ignore write exceptions.
    }
  },
  removeItem(key: string) {
    try {
      localStorage.removeItem(`${storagePrefix}${key}`);
    } catch {
      // Ignore remove exceptions.
    }
  },
};
