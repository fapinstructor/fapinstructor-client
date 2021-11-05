export const TIME_TO_TICK = 2500;
export const TICK_ANIMATION_DURATION = TIME_TO_TICK * 2;
export const ANIMATION_OFFSET_PIXELS = 25;
export const FLASH_ANIMATION_DURATION = 0.25;

export function calculateTickTime() {
  const pixelsPerSecond =
    window.screen.width / (TICK_ANIMATION_DURATION / 1000);
  const pixelsTillTick = window.screen.width / 2 - ANIMATION_OFFSET_PIXELS;
  const tickTimeSeconds = pixelsTillTick / pixelsPerSecond;

  return tickTimeSeconds * 1000;
}
