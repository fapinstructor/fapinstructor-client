import { Box, CircularProgress } from "@material-ui/core";

export default function LoadingPage() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" p={10}>
      <CircularProgress color="secondary" size={100} thickness={2} />
    </Box>
  );
}
