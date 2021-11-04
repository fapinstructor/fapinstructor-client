import { ReactNode } from "react";
import Typography from "@material-ui/core/Typography";
import { Box, Paper, Tooltip } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import styled from "styled-components/macro";

import Stack from "@/components/templates/Stack";
import Cluster from "@/components/templates/Cluster";

export type GroupProps = {
  title: string;
  children: ReactNode;
  tooltip?: string;
};

const TitleContainer = styled(Cluster)`
  align-items: center;
  gap: 0.5rem;
`;

export default function Group({ title, children, tooltip }: GroupProps) {
  return (
    <Paper elevation={3}>
      <Box p={4}>
        <Stack>
          <Typography variant="h6" color="primary">
            <TitleContainer>
              {title}
              {tooltip && (
                <Tooltip
                  title={tooltip}
                  enterTouchDelay={0}
                  leaveTouchDelay={10_000}
                >
                  <InfoIcon fontSize="inherit" />
                </Tooltip>
              )}
            </TitleContainer>
          </Typography>
          {children}
        </Stack>
      </Box>
    </Paper>
  );
}
