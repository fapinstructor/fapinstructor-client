import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";

export type RouteButtonProps = {
  children: ReactNode;
  to: string;
};

export default function RouteButton({ children, to }: RouteButtonProps) {
  return (
    <Button color="inherit" component={NavLink} to={to}>
      {children}
    </Button>
  );
}
