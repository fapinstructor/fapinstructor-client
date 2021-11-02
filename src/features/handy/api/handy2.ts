import axios, { AxiosInstance } from "axios";

// 1. Request URL: https://www.handyfeeling.com/api/v1/DKFdkjKC/getVersion?timeout=5000
// 2. Request URL: https://www.handyfeeling.com/api/handy/v2/settings

// Periodic status checks, once every 5sec
//Request URL: https://www.handyfeeling.com/api/v1/DKFdkjKC/getStatus?timeout=5000

// Start device
// Request URL: https://www.handyfeeling.com/api/v1/DKFdkjKC/setMode?mode=1&timeout=5000
// Request URL: https://www.handyfeeling.com/api/v1/DKFdkjKC/setSpeed?speed=68&type=%25&timeout=5000
// Request URL: https://www.handyfeeling.com/api/v1/DKFdkjKC/setStrokeZone?min=41&max=57&timeout=5000

// Turn device off
// Request URL: https://www.handyfeeling.com/api/v1/DKFdkjKC/setMode?mode=0&timeout=5000

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

type VersionResponse = {
  connected: boolean;
  success: boolean;
  version: string;
  latest: string;
};

class HandyDevice {
  api: AxiosInstance;

  constructor(connectionKey: string) {
    this.api = axios.create({
      baseURL: `https://www.handyfeeling.com/api/v1/${connectionKey}`,
    });
  }

  getVersion() {
    return this.api.get<VersionResponse>("getVersion");
  }

  getSettings() {
    return this.api.get<HandySettings>("getSettings");
  }

  setStroke(stroke: number) {
    return this.api.get("setStroke", { params: { stroke } });
  }

  setSpeed(speed: number) {
    return this.api.get("setSpeed", { params: { speed } });
  }
}

export default HandyDevice;
