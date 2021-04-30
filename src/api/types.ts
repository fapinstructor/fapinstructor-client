export interface Game {
  id: string;
  title: string;
  tags: string[];
  stars: number;
  starred: boolean;
  updatedAt: Date;
}
