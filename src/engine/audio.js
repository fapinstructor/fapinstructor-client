// isSupported is returning false for the lastest version of FireFox.
import { AudioContext /*,isSupported*/ } from "standardized-audio-context";
import memoize from "fast-memoize";
import store from "common/store";
import { createNotification, Severity } from "common/store/notifications";
import { selectEnableVoice } from "common/store/settings";
import { getRandomAudioVariation } from "audio";

let context;
let oscillator;
let gainNode;

export const createAudioContext = async () => {
  // Only create the audio context once
  if (context === undefined) {
    try {
      context = new AudioContext();

      gainNode = context.createGain();
      gainNode.gain.value = 0;

      oscillator = context.createOscillator();
      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      oscillator.start(0);
    } catch {
      context = null;
      store.dispatch(
        createNotification({
          message:
            "Your browser doesn't support the required audio capabilities!",
          severity: Severity.ERROR,
        })
      );
    }
  }
};

export const fetchAudioFile = memoize(async (url) => {
  let buffer;

  if (context && context.decodeAudioData) {
    buffer = await new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open("GET", url, true);
      request.responseType = "arraybuffer";
      request.onerror = reject;
      request.onload = () => {
        resolve(context.decodeAudioData(request.response));
      };
      request.send();
    });
  } else {
    // ie11 fallback
    buffer = new Audio(url);
  }

  return buffer;
});

let tickCount = 0;
let previousRhythm = 0;
export function playTick(rhythm) {
  if (!context || !oscillator || !gainNode) {
    return false;
  }

  let frequency;

  if (previousRhythm === 0 || previousRhythm !== rhythm || rhythm < 3) {
    tickCount = 0;
  }

  if (tickCount === 3) {
    frequency = 600;
    tickCount = 0;
  } else {
    tickCount++;
    frequency = 300;
  }
  previousRhythm = rhythm;

  var now = context.currentTime;

  oscillator.frequency.setValueAtTime(frequency, now);

  // Ramp up the gain so we can hear the sound.
  // We can ramp smoothly to the desired value.
  // First we should cancel any previous scheduled events that might interfere.
  gainNode.gain.cancelScheduledValues(now);
  // Anchor beginning of ramp at current value.
  gainNode.gain.setValueAtTime(gainNode.gain.value, now);
  gainNode.gain.linearRampToValueAtTime(0.3, context.currentTime + 0.001);
  gainNode.gain.linearRampToValueAtTime(0.0, context.currentTime + 0.11);

  return true;
}

export function playVoice(variationName) {
  playCommand(getRandomAudioVariation(variationName));
}

export function playCommand(url) {
  if (!selectEnableVoice(store.getState())) {
    // Cancel voice command
    return;
  }

  return play(url);
}

export default async function play(url) {
  const buffer = await fetchAudioFile(url);

  if (context) {
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);

    if (!source.start) source.start = source.noteOn;
    source.start(0);
  } else {
    const promise = buffer.play();
    if (promise) {
      promise.catch((error) => {
        createNotification({
          message: "Failed to play audio",
          severity: Severity.ERROR,
        });
        console.error("Failed to play audio fallback", error);
      });
    }
  }
}
