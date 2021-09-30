import { Typography } from "@material-ui/core";
import styled from "styled-components/macro";

import EroFightsBanner from "components/atoms/EroFightsBanner";
import theme from "theme";

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

export default function Footer() {
  return (
    <StyledFooter>
      <Typography variant="h6">Friends</Typography>
      <a href="https://www.erofights.com/" target="_blank" rel="noreferrer">
        <EroFightsBanner />
      </a>
    </StyledFooter>
  );
}
