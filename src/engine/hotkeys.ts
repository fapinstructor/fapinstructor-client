import store from "store";
import { ruinedOrgasm } from "game/actions/orgasm/ruin";
import punishment from "../game/actions/punishment";
import { ActionService } from "game/xstate/services";

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
  const { game } = store;

  // Only enable hotkeys while playing a game
  if (!game) {
    return;
  }

  // Ruin
  if (event.key === "r" && !game.ruining) {
    game.ruining = true;
    ActionService.execute(ruinedOrgasm, true).then((interrupted) => {
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
    ActionService.execute(punishment, true).then((interrupted) => {
      if (!interrupted) {
        game.edging = false;
      }
    });
    return;
  }

  // Action triggers
  if (ActionService.triggers) {
    if (ActionService.triggers.length === 1) {
      // When only one hotkey, map to space
      if (event.key === " ") {
        ActionService.execute(ActionService.triggers[0]);
        return;
      }
    } else {
      // When multiple hotkeys, map to triggerHotkeys array
      const hotkeyIndex = triggerHotkeys.findIndex((key) => event.key === key);

      if (hotkeyIndex > -1) {
        const trigger = ActionService.triggers[hotkeyIndex];
        ActionService.execute(trigger);
        return;
      } else {
        // Too many triggers, ran out of hotkeys
      }
    }
  }
});
