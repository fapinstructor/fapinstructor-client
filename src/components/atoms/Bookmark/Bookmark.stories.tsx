import { Story, Meta } from "@storybook/react";
import DefaultImage from "assets/images/default-image.jpg";

import Bookmark, { BookmarkProps } from "./Bookmark";

export default {
  title: "atoms/Bookmark",
  component: Bookmark,
} as Meta;

const Template: Story<BookmarkProps> = (args) => <Bookmark {...args} />;

const defaultArgs = {
  href: "https://fapinstructor.com",
};

export const ImageBookmark = Template.bind({});
ImageBookmark.args = {
  ...defaultArgs,
  src: DefaultImage,
};

export const GifBookmark = Template.bind({});
GifBookmark.args = {
  ...defaultArgs,
  src: "https://media1.giphy.com/media/3o7abAHdYvZdBNnGZq/giphy.gif",
};

export const VideoBookmark = Template.bind({});
VideoBookmark.args = {
  ...defaultArgs,
  src: "https://i.imgur.com/IalPrWs.mp4",
};
