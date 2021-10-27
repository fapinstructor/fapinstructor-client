import { Box, Paper, Typography } from "@material-ui/core";
import styled from "styled-components/macro";

const Container = styled(Paper)`
  background-color: #ffff8d;
`;

export default function SupportSiteBanner() {
  return (
    <Container elevation={3}>
      <Box p={4}>
        <Typography>
          This indie game is free, always will be. If you'd like to support the
          game feel free to checkout my{" "}
          <a
            href="https://www.patreon.com/bePatron?u=29098019"
            target="_blank"
            rel="noreferrer"
          >
            Patreon
          </a>
        </Typography>
      </Box>
    </Container>
  );
}
