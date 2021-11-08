import { ReactNode } from "react";
import Button from "@material-ui/core/Button";

export type AnchorButtonProps = {
  children: ReactNode;
  href: string;
};

export function AnchorButton({ children, href }: AnchorButtonProps) {
  return (
    <Button target="_blank" color="inherit" href={href} rel="noreferrer">
      {children}
    </Button>
  );
}
