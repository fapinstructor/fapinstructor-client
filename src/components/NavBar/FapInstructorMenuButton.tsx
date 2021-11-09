import { ReactNode } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { RouteLink } from "@/components/Elements";
import { MenuItem } from "@/components/Templates";
import { FapInstructorIcon } from "@/components/Icons";

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

export function FapInstructorMenuButton() {
  return (
    <RouteLink to="/">
      <MenuItem
        title={<Title>Fap Instructor</Title>}
        icon={<FapInstructorIcon size={30} />}
      />
    </RouteLink>
  );
}
