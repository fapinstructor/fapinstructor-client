// isSupported is returning false for the latest version of FireFox.
import {
  AudioContext,
  OscillatorNode,
  GainNode,
  IAudioContext,
  IGainNode,
  IOscillatorNode,
} from "standardized-audio-context";

import getAudioUrl, { Audios } from "@/audio";
import store from "@/stores";
import { Severity, createNotification } from "@/stores/notifications";
import { selectSettings } from "@/stores/settings";
import memoize from "@/utils/memoize";

let context: IAudioContext;
let oscillator: IOscillatorNode<IAudioContext>;
let gainNode: IGainNode<IAudioContext>;

export const createAudioContext = async () => {
  // Only create the audio context once
  if (context === undefined) {
    try {
      context = new AudioContext();

      gainNode = new GainNode(context);
      gainNode.gain.value = 0;

      oscillator = new OscillatorNode(context);
      oscillator.connect(gainNode);

      gainNode.connect(context.destination);

      oscillator.start();
    } catch {
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

const fetchAudioFile = memoize(async (url) => {
  const buffer = await new Promise<AudioBuffer>((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";
    request.onerror = () => {
      reject(new Error(`Failed to load ${url}`));
    };
    request.onload = () => {
      const audioData = context.decodeAudioData(request.response);
      resolve(audioData);
    };
    request.send();
  });

  return buffer;
});

let tickCount = 0;
let previousRhythm = 0;
export function playTick(rhythm: number) {
  if (!context || !oscillator || !gainNode) {
    playCommand("tick", { ignoreMute: true });
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

  const now = context.currentTime;

  oscillator.frequency.setValueAtTime(frequency, now);

  // Ramp up the gain so we can hear the sound.
  // We can ramp smoothly to the desired value.
  // First we should cancel any previous scheduled events that might interfere.
  gainNode.gain.cancelScheduledValues(now);
  // Anchor beginning of ramp at current value.
  gainNode.gain.setValueAtTime(gainNode.gain.value, now);
  gainNode.gain.linearRampToValueAtTime(0.3, context.currentTime + 0.001);
  gainNode.gain.linearRampToValueAtTime(0.0, context.currentTime + 0.11);
}

async function playAudioUrl(url: string) {
  const buffer = await fetchAudioFile(url);

  const source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start();
}

type PlayCommandOptions = {
  ignoreMute: boolean;
};

export function playCommand(
  audio: Audios,
  options: PlayCommandOptions = { ignoreMute: false }
) {
  const settings = selectSettings(store.getState());

  if (options.ignoreMute || settings.voice) {
    return playAudioUrl(getAudioUrl(audio));
  }
}
