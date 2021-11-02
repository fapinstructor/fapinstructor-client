export type HandySettings = {
  success: boolean;
  connected: boolean;
  mode: Mode;
  position: number;
  speed: number;
  stroke: number;
};

export enum Mode {
  Off,
  On,
}

export type VersionResponse = {
  connected: boolean;
  success: boolean;
  version: string;
  latest: string;
};
