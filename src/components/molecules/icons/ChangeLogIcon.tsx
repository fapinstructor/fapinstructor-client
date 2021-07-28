import ChangeLogImage from "@material-ui/icons/FormatListBulleted";
import Icon from "components/atoms/Icon";

type ChangeLogProps = {
  size: number;
};

export default function ChangeLogIcon({ size }: ChangeLogProps) {
  return (
    <Icon size={size}>
      <ChangeLogImage
        style={{ color: "black", width: "100%", height: "100%" }}
      />
    </Icon>
  );
}
