// TODO: Implement better mocking strategy
import { Story, Meta } from "@storybook/react";

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
      src: "https://fapinstructor.com/images/default-image.jpg",
    },
    {
      href: "https://fapinstructor.com",
      src: "https://fapinstructor.com/images/background.jpg",
    },
    {
      href: "https://fapinstructor.com",
      src: "https://fapinstructor.com/images/default-image.jpg",
    },
    {
      href: "https://fapinstructor.com",
      src: "https://fapinstructor.com/images/background.jpg",
    },
    {
      href: "https://fapinstructor.com",
      src: "https://fapinstructor.com/images/default-image.jpg",
    },
    {
      href: "https://fapinstructor.com",
      src: "https://fapinstructor.com/images/background.jpg",
    },
  ],
};
