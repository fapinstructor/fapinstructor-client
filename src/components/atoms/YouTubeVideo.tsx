import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useYouTubeStyles = makeStyles(() => ({
  youtube: {
    width: "99%",
    height: "90%",
  },
}));

type YouTubeVideoProps = {
  src: string;
};

export default function YouTubeVideo({ src }: YouTubeVideoProps) {
  const classes = useYouTubeStyles();

  return (
    <iframe
      src={src}
      title="youtube"
      className={classes.youtube}
      frameBorder="0"
      allowFullScreen
    />
  );
}
