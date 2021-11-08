import type { Meta } from "@storybook/react/types-6-0";
import styled from "styled-components/macro";

import { Stack } from "./Stack";

export default {
  title: "Templates/Stack",
  component: Stack,
} as Meta;

const ExampleContainer = styled(Stack)`
  > * {
    border: 1px dotted black;
  }
`;

export const Standard = () => (
  <ExampleContainer>
    <h1>Stack Example</h1>
    <div>Item 1</div>
    <div>Item 2</div>
    <button className="stack-skip">Skip Stack</button>
    <div>Item 4</div>
  </ExampleContainer>
);
