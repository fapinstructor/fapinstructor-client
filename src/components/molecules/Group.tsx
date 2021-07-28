import { ReactNode } from "react";
import Typography from "@material-ui/core/Typography";

export type GroupProps = {
  title: string;
  children: ReactNode;
};

export default function Group({ title, children }: GroupProps) {
  return (
    <div style={{ marginBottom: 30 }}>
      <div style={{ marginBottom: 15 }}>
        <Typography variant="h6" color="primary">
          {title}
        </Typography>
      </div>
      <div>{children}</div>
    </div>
  );
}
