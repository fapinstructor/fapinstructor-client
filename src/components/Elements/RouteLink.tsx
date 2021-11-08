import { ReactNode } from "react";
import MuiLink from "@material-ui/core/Link";
import { Link } from "react-router-dom";

export type RouteLinkProps = {
  children: ReactNode;
  to: string;
};

export function RouteLink({ children, to }: RouteLinkProps) {
  return (
    <MuiLink color="inherit" component={Link} to={to}>
      {children}
    </MuiLink>
  );
}
