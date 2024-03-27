import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import { MediaLink, MediaType } from "@/types/Media";
import { selectSettings } from "@/stores/settings";

const useStyles = makeStyles(() => ({
  video: {
    width: "100%",
    height: "99%",
  },
  image: {
    width: "100%",
    height: "99%",
    objectFit: "contain",
  },
  youtube: {
    width: "99%",
    height: "90%",
  },
}));

const isYouTube = (url: string) => url.includes("www.youtube-nocookie.com");

export type MediaPlayerProps = {
  link: MediaLink;
  onEnded: () => void;
  duration: number;
};

export function MediaPlayer({ link, duration, onEnded }: MediaPlayerProps) {
  const classes = useStyles();
  const [playCount, setPlayCount] = useState(0);
  const settings = useSelector(selectSettings);

  useEffect(() => {
    let timeout = 0;

    if (
      link.mediaType === MediaType.Picture ||
      link.mediaType === MediaType.Gif
    ) {
      if (timeout === 0) {
        timeout = window.setTimeout(onEnded, duration * 1000);
      }
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [link, duration, onEnded]);

  function repeatForDuration(event: React.ChangeEvent<HTMLVideoElement>) {
    if (event.target.duration * (playCount + 1) < duration) {
      setPlayCount(playCount + 1);
      event.target.play().catch(() => {
        // An exception is thrown if the user changes the slide before the video starts playback.
        // Ref: https://goo.gl/LdLk22
      });
    } else {
      setPlayCount(0);
      onEnded();
    }
  }

  if (link.mediaType === MediaType.Video) {
    return (
      <video
        className={classes.video}
        src={link.directLink}
        style={{
          pointerEvents: `none`,
        }}
        autoPlay
        muted={!settings.videoAudio}
        onError={onEnded}
        onEnded={repeatForDuration}
        playsInline
      />
    );
  } else if (
    link.mediaType === MediaType.Gif ||
    link.mediaType === MediaType.Picture
  ) {
    return (
      <img
        className={classes.image}
        src={link.directLink}
        alt=""
        onError={onEnded}
        onLoad={(e) => {
          // Skip deleted images
          if (
            // https://i.redd.it/82i0kk14a27c1.jpg
            (e.currentTarget.naturalWidth === 130 && e.currentTarget.naturalHeight === 60) ||
            // https://i.imgur.com/GooGxMd.gif
            (e.currentTarget.naturalWidth === 161 && e.currentTarget.naturalHeight === 81)
          ) {
            onEnded();
          }
        }}
      />
    );
  } else if (isYouTube(link.directLink)) {
    return (
      <iframe
        src={link.directLink}
        title="youtube"
        className={classes.youtube}
        frameBorder="0"
        allowFullScreen
      />
    );
  } else {
    throw new Error("unavailable media type");
  }
}
