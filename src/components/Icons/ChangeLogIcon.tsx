import ChangeLogImage from "@material-ui/icons/FormatListBulleted";
import { Icon } from "./Icon";

type ChangeLogProps = {
  size: number;
};

export function ChangeLogIcon({ size }: ChangeLogProps) {
  return (
    <Icon size={size}>
      <ChangeLogImage
        style={{ color: "black", width: "100%", height: "100%" }}
      />
    </Icon>
  );
}
