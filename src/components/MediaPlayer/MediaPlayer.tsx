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
    border: 0,
  },
  redgifs: {
    width: "100%",
    height: "99%",
    border: 0,
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

  const isRedgifsVideo = link.mediaType === MediaType.Video && link.directLink.includes('redgifs.com/')

  useEffect(() => {
    let timeout = 0;

    if (
      link.mediaType === MediaType.Picture ||
      link.mediaType === MediaType.Gif ||
      isRedgifsVideo
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

  if (isRedgifsVideo) {
    // directLink: https://thumbs44.redgifs.com/RespectfulLightsalmonEnglishpointer-mobile.mp4
    // <iframe src="https://www.redgifs.com/ifr/respectfullightsalmonenglishpointer" />
    const redgifsId = link.directLink.match(/redgifs\.com\/([a-z0-9]+)/i)?.[1]?.toLowerCase()
    return <iframe
      src={'https://www.redgifs.com/ifr/' + redgifsId}
      title="redgifs"
      className={classes.redgifs}
    />
  } else if (link.mediaType === MediaType.Video) {
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
    return <img className={classes.image} src={link.directLink} alt="" />;
  } else if (isYouTube(link.directLink)) {
    return (
      <iframe
        src={link.directLink}
        title="youtube"
        className={classes.youtube}
        allowFullScreen
      />
    );
  } else {
    throw new Error("unavailable media type");
  }
}
