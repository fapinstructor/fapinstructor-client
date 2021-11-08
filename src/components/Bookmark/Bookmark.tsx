import { Typography } from "@material-ui/core";

export type BookmarkProps = {
  href: string;
  src: string;
};

export function Bookmark({ href, src }: BookmarkProps) {
  //* TODO: Use media player to show each image
  return (
    <a href={src} target="_blank" rel="noreferrer">
      <Typography variant="subtitle1">{src}</Typography>
    </a>
  );
}
