import { ReactNode } from "react";
import Typography from "@material-ui/core/Typography";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { Box, Paper, Tooltip } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import styled from "styled-components/macro";

import { Stack, Cluster } from "@/components/Templates";

export type GroupProps = {
  title: ReactNode;
  children: ReactNode;
  tooltip?: string;
  style?: CSSProperties;
};

const TitleContainer = styled(Cluster)`
  align-items: center;
  gap: 0.5rem;
`;

export function Group({ title, children, tooltip, style }: GroupProps) {
  return (
    <Paper elevation={3} style={style}>
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
