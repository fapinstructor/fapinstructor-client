import { TICK_DELAY } from "@/config";

export const TICK_ANIMATION_DURATION = TICK_DELAY * 2;
export const ANIMATION_OFFSET_PIXELS = 25;
export const FLASH_ANIMATION_DURATION = 0.25;

export function calculateTickTime() {
  const pixelsPerSecond =
    window.screen.width / (TICK_ANIMATION_DURATION / 1000);
  const pixelsTillTick = window.screen.width / 2 - ANIMATION_OFFSET_PIXELS;
  const tickTimeSeconds = pixelsTillTick / pixelsPerSecond;

  return tickTimeSeconds * 1000;
}
