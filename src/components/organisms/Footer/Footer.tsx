import { makeStyles, Typography } from "@material-ui/core";
import EroFightsBanner from "components/atoms/EroFightsBanner";

const useStyles = makeStyles({
  container: {
    paddingTop: "3rem",
  },
});

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="h6">Affiliates</Typography>
      <a href="https://www.erofights.com/" target="_blank" rel="noreferrer">
        <EroFightsBanner />
      </a>
    </div>
  );
}
