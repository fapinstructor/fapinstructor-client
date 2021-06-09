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

window.addEventListener("keydown", function (event) {
  const { game } = store;

  // Only enable hotkeys while playing a game
  if (!game) {
    return;
  }

  // Ruin
  if (event.key === "r" && !game.ruining) {
    ActionService.execute(ruinedOrgasm, true);
    return;
  }

  // Edge
  if (event.key === "e" && !game.edging) {
    game.edging = true;
    game.edges++;
    ActionService.execute(edged, true);
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
