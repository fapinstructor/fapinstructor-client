import { Story, Meta } from "@storybook/react";
import { MediaType } from "@/common/types/Media";
import SampleImage from "@/test/samples/images/file_example_JPG_100kB.jpg";
//@ts-expect-error Not sure why bu the mp4 imports showing a TS error
import SampleVideo from "@/test/samples/videos/file_example_MP4_480_1_5MG.mp4";
import SampleGif from "@/test/samples/images/file_example_GIF_small.gif";
import noop from "@/test/noop";

import MediaPlayer, { MediaPlayerProps } from "./MediaPlayer";

export default {
  title: "organisms/MediaPlayer",
  component: MediaPlayer,
} as Meta;

const Template: Story<MediaPlayerProps> = (args) => <MediaPlayer {...args} />;

const defaultArgs = {
  onEnded: noop,
};

export const PlayImage = Template.bind({});
PlayImage.args = {
  ...defaultArgs,
  link: {
    mediaType: MediaType.Picture,
    directLink: SampleImage,
    sourceLink: "google.com",
  },
};

export const PlayGif = Template.bind({});
PlayGif.args = {
  ...defaultArgs,
  link: {
    mediaType: MediaType.Gif,
    directLink: SampleGif,
    sourceLink: "google.com",
  },
};

export const PlayVideo = Template.bind({});
PlayVideo.args = {
  ...defaultArgs,
  link: {
    mediaType: MediaType.Video,
    directLink: SampleVideo,
    sourceLink: "google.com",
  },
};
