import watchObject from "./utils/watchObject";
import type { GameConfig } from "configureStore";
import type { Game } from "game/configureStore";

type Trigger = Promise<undefined> & {
  label: string;
};

export type Engine = {
  actionTriggers?: Trigger[];
  executing: boolean;
};

export type LocalStorage = {
  enableVoice: boolean;
  enableMoans: boolean;
  videoMuted: boolean;
  enableTicks: boolean;
  enableBeatMeter: boolean;
};

export type Store = {
  title?: string;
  tags?: string[];
  config: GameConfig;
  localStorage: LocalStorage;
  game: Game;
  engine: Engine;
};

declare global {
  interface Window {
    store: Store;
  }
}

function getLocalStorageFlagWithDefault(id: string, defaultValue: boolean) {
  let flag = defaultValue;

  try {
    const item = localStorage.getItem(id);

    if (item !== null) {
      flag = Boolean(item);
    }
  } catch {
    // In some cases local storage might be disabled
  }

  return flag;
}

// Load global game preferences
const localStorageConfig: LocalStorage = {
  enableVoice: getLocalStorageFlagWithDefault("enableVoice", true),
  enableMoans: getLocalStorageFlagWithDefault("enableVoice", true),
  videoMuted: getLocalStorageFlagWithDefault("videoMuted", false),
  enableTicks: getLocalStorageFlagWithDefault("enableTicks", true),
  enableBeatMeter: getLocalStorageFlagWithDefault("enableBeatMeter", true),
};

const store: Store = {
  /**
   * The game isn't initalized, at this point,
   * but we assume it is when this object is actually used.
   */
  // @ts-expect-error
  localStorage: undefined,
  // @ts-expect-error
  game: undefined,
  // @ts-expect-error
  config: undefined,
  // @ts-expect-error
  engine: undefined,
};

type Subscriber = () => void;

const subscribers: Subscriber[] = [];

/**
 * Observe for any changes in the store
 */
const subscribe = (callback: Subscriber) => {
  if (typeof callback !== "function") {
    console.error("subscribe expected a function, received", callback);
  }
  return subscribers.push(callback);
};

/**
 * Stop observing for change in the store
 */
const unsubscribe = (id: number) => {
  delete subscribers[id - 1];
};

/**
 * Wrap the store in an observable proxy
 */
const observableStore: Store = watchObject(store, () => {
  subscribers.forEach((callback) => {
    callback();
  });
});

observableStore.localStorage = localStorageConfig;

window.store = observableStore;

export { subscribe, unsubscribe };
export default observableStore;
