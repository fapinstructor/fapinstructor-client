import { ReactNode } from "react";
import Typography from "@material-ui/core/Typography";
import Stack from "components/templates/Stack";

export type GroupProps = {
  title: string;
  children: ReactNode;
};

export default function Group({ title, children }: GroupProps) {
  return (
    <Stack>
      <Typography variant="h6" color="primary">
        {title}
      </Typography>
      {children}
    </Stack>
  );
}
