import type { Meta } from "@storybook/react/types-6-0";
import styled from "styled-components/macro";

import Cluster from "./Cluster";

export default {
  title: "Templates/Cluster",
  component: Cluster,
} as Meta;

const ExampleContainer = styled(Cluster)`
  > * {
    border: 1px dotted black;
  }
`;

export const Standard = () => (
  <ExampleContainer>
    <button>Button 1</button>
    <button>Button 2</button>
    <button>Button 3</button>
  </ExampleContainer>
);
