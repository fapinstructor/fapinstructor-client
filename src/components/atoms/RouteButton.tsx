import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

export type RouteButtonProps = {
  children: ReactNode;
  to: string;
};

const useRouteButtonStyles = makeStyles({
  button: {
    justifyContent: "flex-start",
  },
});

export default function RouteButton({ children, to }: RouteButtonProps) {
  const classes = useRouteButtonStyles();

  return (
    <Button
      color="inherit"
      component={NavLink}
      to={to}
      className={classes.button}
    >
      {children}
    </Button>
  );
}
