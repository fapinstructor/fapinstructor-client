import store from "store";
import executeAction from "engine/executeAction";
import { ruinedOrgasm } from "game/actions/orgasm/ruin";
import punishment from "../game/actions/punishment";

export const triggerHotkeys = [
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
  "<",
  ">",
  "/",
];

window.addEventListener("keydown", function (event) {
  const { engine, game } = store;

  // Only enable hotkeys while playing a game
  if (!game) {
    return;
  }

  // Ruin
  if (event.key === "r" && !game.ruining) {
    game.ruining = true;
    executeAction(ruinedOrgasm, true).then((interrupted: boolean) => {
      if (!interrupted) {
        game.ruining = false;
      }
    });
    return;
  }

  // Edge
  if (event.key === "e" && !game.edging) {
    game.edging = true;
    game.edges++;
    executeAction(punishment, true).then((interrupted: boolean) => {
      if (!interrupted) {
        game.edging = false;
      }
    });
    return;
  }

  // Action triggers
  if (engine.actionTriggers) {
    if (engine.actionTriggers.length === 1) {
      // When only one hotkey, map to space
      if (event.key === " ") {
        executeAction(engine.actionTriggers[0]);
        return;
      }
    } else {
      // When multiple hotkeys, map to triggerHotkeys array
      const hotkeyIndex = triggerHotkeys.findIndex((key) => event.key === key);

      if (hotkeyIndex > -1) {
        const trigger = engine.actionTriggers[hotkeyIndex];
        executeAction(trigger);
        return;
      } else {
        // Too many triggers, ran out of hotkeys
      }
    }
  }
});
