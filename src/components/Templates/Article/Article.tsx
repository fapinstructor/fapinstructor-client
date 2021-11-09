import styled from "styled-components/macro";

import theme from "@/theme";

export const Article = styled.article`
  display: grid;
  grid-auto-rows: min-content;
  grid-template-columns: 1fr;

  @media screen and (${theme.breakpoint.mobile.up}) {
    grid-template-columns: 1fr 1.5fr 1fr;

    & > * {
      grid-column: 2;
    }
  }
`;
