const api = "https://www.handyfeeling.com/api/v1";
const connectionKey = "DKFdkjKC";

enum Mode {
  Off,
  On,
}

type HandySettings = {
  success: boolean;
  connected: boolean;
  mode: Mode;
  position: number;
  speed: number;
  stroke: number;
};

// mm/s
// const minSpeed = 32;
// const maxSpeed = 400;

// const minStroke = 24;
// const maxStroke = 200;

function lerp(value1: number, value2: number, amount: number) {
  amount = amount < 0 ? 0 : amount;
  amount = amount > 1 ? 1 : amount;

  return value1 + (value2 - value1) * amount;
}

class HandyAPI {
  mode = 0;
  speed = 0;
  stroke = 100;

  constructor() {
    this.reset();
  }

  reset() {
    this.setMode(this.mode);
    this.setSpeed(this.speed);
    this.setStroke(this.stroke);
  }

  setMode(mode: Mode) {
    this.mode = mode;

    fetch(`${api}/${connectionKey}/setMode?mode=${mode}`);
  }

  setSpeed(beatsPerSecond: number) {
    const strokeLength = 100 / 100;
    const speed = Math.round(beatsPerSecond * lerp(10, 45, strokeLength));

    if (this.speed !== speed) {
      this.speed = speed;

      if (speed === 0 && this.mode !== 0) {
        this.setMode(0);
      } else if (speed > 0 && this.mode !== 1) {
        this.setMode(1);
      }

      fetch(`${api}/${connectionKey}/setSpeed?type=%25&speed=${speed}`);
    }
  }

  setStroke(stroke: number) {
    fetch(`${api}/${connectionKey}/setStroke?type=%&stroke=${stroke}`);
  }

  getSettings() {
    return fetch(`${api}/${connectionKey}/getSettings`).then<HandySettings>(
      (res) => res.json()
    );
  }
}

export default new HandyAPI();
