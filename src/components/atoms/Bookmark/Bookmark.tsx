import { Typography } from "@material-ui/core";
import React from "react";

export type BookmarkProps = {
  href: string;
  src: string;
};

export default function Bookmark({ href, src }: BookmarkProps) {
  return (
    <>
      {/* TODO: Use media player to show each image  */}
      <a href={src} target="_blank" rel="noopener noreferrer">
        <Typography variant="subtitle1">{src}</Typography>
      </a>
    </>
  );
}
