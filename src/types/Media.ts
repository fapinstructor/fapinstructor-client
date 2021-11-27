export enum MediaType {
  Picture = "PICTURE",
  Gif = "GIF",
  Video = "VIDEO",
}

export type MediaLink = {
  sourceLink: string;
  directLink: string;
  mediaType: MediaType;
};

export type MediaRequest = {
  subreddits: string[];
  limit: number;
  mediaTypes: MediaType[];
};

export type MediaResponse = {
  failedSubreddits: [string];
  links: [MediaLink];
};
