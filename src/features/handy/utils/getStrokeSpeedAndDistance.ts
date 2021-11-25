// The fastest speed the handy can operate at.
export const maxStrokeSpeed = 400;

// Max stroke is around 200mm including buffers at the end. Varies +-5mm depending on FW and batch #.
export const maxStrokeLength = 195;

// The fastest beats per second the handy can operate at with the maximum stroke length.
export const fastestBps = maxStrokeSpeed / maxStrokeLength;

/**
 * Calculates the stroke speed and distance from the specified beats per second.
 */
export default function getStrokeSpeedAndDistance(bps: number) {
  let speed = maxStrokeSpeed;
  let stroke = maxStrokeLength;
  const strokeZone = { min: 0, max: 100 }; // %

  // Decrease stroke speed to decrease BPS
  if (bps < fastestBps) {
    speed = maxStrokeLength * bps;
  }

  // Shorten stroke distance to increase BPS
  if (bps > fastestBps) {
    stroke = maxStrokeSpeed / (bps * fastestBps);
    strokeZone.min = Math.trunc(
      ((maxStrokeLength - stroke) / maxStrokeLength) * 100
    );
  }

  // Handy doesn't support decimal places with firmware 3+.
  return {
    speed: Math.trunc(speed),
    stroke: Math.trunc(stroke),
    strokeZone,
  };
}
