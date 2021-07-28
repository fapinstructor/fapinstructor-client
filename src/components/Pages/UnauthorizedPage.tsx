import { Box } from "@material-ui/core";

export default function UnauthorizedPage() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" p={5}>
      You are unauthorized to view this page. Please attempt to login and try
      again.
    </Box>
  );
}
