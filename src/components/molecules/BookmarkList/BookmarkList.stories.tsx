// TODO: Implement better mocking strategy
import { Story, Meta } from "@storybook/react";
import BackgroundImage from "@/assets/images/background.jpg";
import DefaultImage from "@/assets/images/default-image.jpg";

import BookmarkList, { BookmarkListProps } from "./BookmarkList";

export default {
  title: "molecules/BookmarkList",
  component: BookmarkList,
} as Meta;

const Template: Story<BookmarkListProps> = (args) => <BookmarkList {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  bookmarks: [
    {
      href: "https://fapinstructor.com",
      src: DefaultImage,
    },
    {
      href: "https://fapinstructor.com",
      src: BackgroundImage,
    },
    {
      href: "https://fapinstructor.com",
      src: DefaultImage,
    },
    {
      href: "https://fapinstructor.com",
      src: BackgroundImage,
    },
    {
      href: "https://fapinstructor.com",
      src: DefaultImage,
    },
    {
      href: "https://fapinstructor.com",
      src: BackgroundImage,
    },
  ],
};
