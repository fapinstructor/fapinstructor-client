import { setStrokeStyle } from "game/enums/StrokeStyle";

// Added for backwards compatability, wraps setStrokeStyle
export const setStrokeStyleBothHands = () => setStrokeStyle("bothHands");
export const setStrokeStyleDominant = () => setStrokeStyle("dominant");
export const setStrokeStyleHeadOnly = () => setStrokeStyle("headOnly");
export const setStrokeStyleNondominant = () => setStrokeStyle("nondominant");
export const setStrokeStyleOverhandGrip = () => setStrokeStyle("overhandGrip");
export const setStrokeStyleShaftOnly = () => setStrokeStyle("shaftOnly");
export const setStrokeStyleHandsOff = () => setStrokeStyle("handsOff");
