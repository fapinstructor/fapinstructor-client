import { OldGameConfig } from "configureStore";

export default interface Game {
  id: string;
  title: string;
  tags: string[];
  isPublic: boolean;
  config: OldGameConfig;
  stars: number;
  starred: boolean;
}
