import { Quote } from "./Quote";

import type { Meta } from "@storybook/react/types-6-0";

export default {
  title: "elements/Quote",
  component: Quote,
} as Meta;

export const Standard = () => (
  <Quote
    by="Bill Gates (Allegedly)"
    source="https://quoteinvestigator.com/2011/09/08/640k-enough/"
  >
    640kb of memory ought to be enough for anyone.
  </Quote>
);
