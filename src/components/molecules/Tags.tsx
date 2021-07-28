import { Box } from "@material-ui/core";
import Tag from "components/molecules/Tag";

export type TagsProps = {
  tags: string[];
};

export default function Tags({ tags }: TagsProps) {
  return (
    <Box display="flex" justifyContent="flex-start">
      {tags.map((tag, index) => (
        <Box key={index} mr={1}>
          <Tag tag={tag} />
        </Box>
      ))}
    </Box>
  );
}
