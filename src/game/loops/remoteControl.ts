export default {
  paused: false,
  play() {
    this.paused = false;
    return this.paused;
  },
  pause() {
    this.paused = true;
    return this.paused;
  },
};
