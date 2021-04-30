import { GameConfig } from "configureStore";

export default interface Game {
  id: string;
  title: string;
  tags: string[];
  isPublic: boolean;
  config: GameConfig;
  stars: number;
  starred: boolean;
}
