import type { Meta } from "@storybook/react/types-6-0";

import { Article } from "./Article";

export default {
  title: "Templates/Article",
  component: Article,
} as Meta;

export const Standard = () => (
  <Article>
    <h1>Article Title</h1>
    <div>Body</div>
  </Article>
);
