import store from "store";
import { ruinedOrgasm } from "game/actions/orgasm/ruin";
import { ActionService } from "game/xstate/services";
import { edged } from "game/actions/orgasm/edge";

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

window.addEventListener("keydown", (event) => {
  const { game } = store;

  // Only enable hotkeys while playing a game
  if (!game) {
    return;
  }

  if (!game.cooldown) {
    // Ruin
    if (event.key === "r") {
      ActionService.execute(ruinedOrgasm);
      return;
    }

    // Edge
    if (event.key === "e") {
      ActionService.execute(edged);
      return;
    }
  }

  // Action triggers
  if (!ActionService.stopped && ActionService.triggers) {
    if (ActionService.triggers.length === 1) {
      // When only one hotkey, map to space
      if (event.key === " ") {
        ActionService.execute(ActionService.triggers[0]);
      }
    } else {
      // When multiple hotkeys, map to triggerHotkeys array
      const hotkeyIndex = triggerHotkeys.findIndex((key) => event.key === key);

      if (hotkeyIndex > -1) {
        const trigger = ActionService.triggers[hotkeyIndex];

        // Might be undefined if the current key isn't mapped to a trigger
        if (trigger) {
          ActionService.execute(trigger);
        }
      } else {
        // Too many triggers, ran out of hotkeys
      }
    }
  }
});
