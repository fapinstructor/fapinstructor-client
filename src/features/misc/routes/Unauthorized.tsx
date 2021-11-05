import { Box } from "@material-ui/core";

export function Unauthorized() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" p={5}>
      You are unauthorized to view this page. Please attempt to login and try
      again.
    </Box>
  );
}
