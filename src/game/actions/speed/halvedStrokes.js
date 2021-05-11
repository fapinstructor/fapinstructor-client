import { setStrokeSpeed } from "game/utils/strokeSpeed";
import { StrokeService } from "game/xstate/services";

const halvedStrokes = async () => {
  setStrokeSpeed(StrokeService.strokeSpeed / 2);
};
halvedStrokes.label = "Halved Strokes";

export default halvedStrokes;
