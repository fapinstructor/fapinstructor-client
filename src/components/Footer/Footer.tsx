import { Typography } from "@material-ui/core";
import styled from "styled-components/macro";

import theme from "@/theme";
import { EroFightsBanner } from "./EroFightsBanner";

const StyledFooter = styled.footer`
  margin-top: 8rem;
  color: white;
  background-color: ${theme.color.primary};
  width: 100%;
  height: 50vh;

  @media screen and (${theme.breakpoint.tablet.up}) {
    & > * {
      margin: 1rem;
    }
  }
`;

export function Footer() {
  return (
    <StyledFooter>
      <Typography variant="h6">Friends</Typography>
      <a href="https://www.erofights.com/" target="_blank" rel="noreferrer">
        <EroFightsBanner />
      </a>
    </StyledFooter>
  );
}
