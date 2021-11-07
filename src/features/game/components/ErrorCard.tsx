import { Typography } from "@material-ui/core";
import { Group } from "@/components/Group";

export type ErrorCardProps = {
  error: string;
};

export function ErrorCard({ error }: ErrorCardProps) {
  return (
    <Group title="An error has occurred">
      <Typography variant="body1">{error}</Typography>
    </Group>
  );
}
