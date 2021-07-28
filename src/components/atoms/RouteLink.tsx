import { ReactNode } from "react";
import MuiLink from "@material-ui/core/Link";
import { Link } from "react-router-dom";

export type RouteButtonProps = {
  children: ReactNode;
  to: string;
};

export default function RouteLink({ children, to }: RouteButtonProps) {
  return (
    <MuiLink color="inherit" component={Link} to={to}>
      {children}
    </MuiLink>
  );
}
