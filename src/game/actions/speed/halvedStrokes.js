import createNotification from "engine/createNotification";
import { setStrokeSpeed } from "game/utils/strokeSpeed";
import { StrokeService } from "game/xstate/services";

export const halvedStrokes = async () => {
  createNotification({
    message: "Halve your stroke speed!",
    delay: true,
  });

  setStrokeSpeed(StrokeService.strokeSpeed / 2);
};
halvedStrokes.label = "Halved Strokes";
