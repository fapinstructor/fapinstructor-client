import { Typography } from "@material-ui/core";
import Group from "components/molecules/Group";

export type ErrorCardProps = {
  error: string;
};

export default function ErrorCard({ error }: ErrorCardProps) {
  return (
    <Group title="An error has occured">
      <Typography variant="body1">{error}</Typography>
    </Group>
  );
}
