import { Box, Paper, Typography } from "@material-ui/core";
import styled from "styled-components/macro";

const Container = styled(Paper)`
  background-color: #ffff8d;
`;

export default function SupportSiteBanner() {
  return (
    <Container elevation={3}>
      <Box p={4}>
        <Typography variant="subtitle1" gutterBottom>
          This indie game is free, always will be. It's been my passion project
          for years built with ❤️
        </Typography>
        <Typography variant="subtitle2">
          If you love this game as much as I do and want to show your support,
          please feel free to checkout my{" "}
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
