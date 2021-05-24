import watchObject from "./utils/watchObject";
import type { GameConfig } from "configureStore";
import type { Game } from "game/configureStore";

export type Store = {
  title?: string;
  tags?: string[];
  config: GameConfig;
  game: Game;
};

declare global {
  interface Window {
    store: Store;
  }
}

const store: Store = {
  /**
   * The game isn't initalized, at this point,
   * but we assume it is when this object is actually used.
   */
  // @ts-expect-error
  game: undefined,
  // @ts-expect-error
  config: undefined,
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

window.store = observableStore;

export { subscribe, unsubscribe };
export default observableStore;
