import { Box, Chip } from "@material-ui/core";

export type TagsProps = {
  tags: string[];
};

export function Tags({ tags }: TagsProps) {
  return (
    <Box display="flex" justifyContent="flex-start">
      {tags.map((tag, index) => (
        <Box key={index} mr={1}>
          <Chip label={tag} />
        </Box>
      ))}
    </Box>
  );
}
