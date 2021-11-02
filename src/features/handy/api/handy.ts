import { HandySettings, Mode, VersionResponse } from "../types";
import getStrokeSpeedAndDistance, {
  maxStrokeLength,
} from "../utils/getStrokeSpeedAndDistance";

const api = "https://www.handyfeeling.com/api/v1";
const CHECK_CONNECTION_INTERVAL = 5000;

type Subscriber = (connected: boolean) => void;

class HandyAPI {
  subscribers: Subscriber[] = [];
  monitorInterval?: number;
  connected = false;
  connectionKey = "";
  mode = 0;
  speed = 0;
  stroke = maxStrokeLength;

  constructor() {
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
  }

  subscribe(subscriber: Subscriber) {
    this.subscribers.push(subscriber);
  }

  unsubscribe(subscriber: Subscriber) {
    const subscriberIndex = this.subscribers.findIndex((s) => s === subscriber);

    if (subscriberIndex >= 0) {
      delete this.subscribers[subscriberIndex];
    }
  }

  unsubscribeAll() {
    this.subscribers = [];
  }

  notify(...payload: Parameters<Subscriber>) {
    this.subscribers.forEach((subscriber) => subscriber(...payload));
  }

  async connect(connectionKey: string) {
    this.connectionKey = connectionKey;

    const connected = await this.checkConnection();

    if (!connected) {
      throw new Error("Unable to establish connection with your Handy device.");
    }

    this.connected = connected;

    // Periodically check to see if the connection is still established.
    this.monitorInterval = window.setInterval(async () => {
      const connected = await this.checkConnection();
      const previousConnected = this.connected;
      this.connected = connected;

      if (connected !== previousConnected) {
        if (connected) {
          // Reconfigure device
          this.setMode(1);
          this.setSpeed(this.speed);
          this.setStroke(this.stroke);
        }
        this.notify(connected);
      }
    }, CHECK_CONNECTION_INTERVAL);
  }

  async checkConnection() {
    let connected = false;

    try {
      const versionResponse = await this.getVersion();
      connected = versionResponse.connected;
    } catch {
      connected = false;
    }

    return connected;
  }

  disconnect() {
    if (this.monitorInterval) {
      clearInterval(this.monitorInterval);
    }
    this.unsubscribeAll();

    this.connectionKey = "";
    this.connected = false;
  }

  reset() {
    this.setMode(0);
    this.setSpeed(0);
    this.setStroke(maxStrokeLength);
  }

  setBeatsPerSecond(bps: number) {
    if (!this.connected) {
      throw new Error("Handy is disconnected");
    }

    const { speed, stroke } = getStrokeSpeedAndDistance(bps);

    this.setSpeed(speed);
    this.setStroke(stroke);
  }

  private setMode(mode: Mode) {
    if (!this.connected) {
      throw new Error("Handy is disconnected");
    }

    this.mode = mode;

    fetch(`${api}/${this.connectionKey}/setMode?mode=${mode}`);
  }

  private setSpeed(speed: number) {
    if (!this.connected) {
      throw new Error("Handy is disconnected");
    }

    if (this.speed !== speed) {
      this.speed = speed;

      if (speed === 0 && this.mode !== 0) {
        this.setMode(0);
      } else if (speed > 0 && this.mode !== 1) {
        this.setMode(1);
      }

      fetch(`${api}/${this.connectionKey}/setSpeed?speed=${speed}`);
    }
  }

  private setStroke(stroke: number) {
    if (!this.connected) {
      throw new Error("Handy is disconnected");
    }

    if (this.stroke !== stroke) {
      this.stroke = stroke;
      fetch(`${api}/${this.connectionKey}/setStroke?stroke=${stroke}`);
    }
  }

  private getSettings() {
    if (!this.connectionKey) {
      throw new Error(
        "Cannot call the API when the the Handy connection key is null"
      );
    }

    return fetch(
      `${api}/${this.connectionKey}/getSettings`
    ).then<HandySettings>((res) => res.json());
  }

  private getVersion() {
    if (!this.connectionKey) {
      throw new Error(
        "Cannot call the API when the the Handy connection key is null"
      );
    }

    return fetch(
      `${api}/${this.connectionKey}/getVersion`
    ).then<VersionResponse>((res) => res.json());
  }
}

export default new HandyAPI();
