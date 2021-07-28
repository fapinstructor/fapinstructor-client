import { ReactNode } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import RouteLink from "components/atoms/RouteLink";
import MenuItem from "components/templates/MenuItem";
import FapInstructorIcon from "components/molecules/icons/FapInstructorIcon";

const useStyles = makeStyles({
  title: {
    fontFamily: "'Damion', cursive",
    whiteSpace: "nowrap",
  },
});

type TitleProps = {
  children: ReactNode;
};

function Title({ children }: TitleProps) {
  const classes = useStyles();

  return (
    <Typography variant="h4" className={classes.title}>
      {children}
    </Typography>
  );
}

export default function FapInstructorMenuButton() {
  return (
    <RouteLink to="/">
      <MenuItem
        title={<Title>Fap Instructor</Title>}
        smallTitle={<Title>FI</Title>}
        icon={<FapInstructorIcon size={30} />}
      />
    </RouteLink>
  );
}
