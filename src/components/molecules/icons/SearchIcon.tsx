import SearchImage from "@material-ui/icons/Search";
import Icon from "@/components/atoms/Icon";

type SearchIconProps = {
  size: number;
};

export default function SearchIcon({ size }: SearchIconProps) {
  return (
    <Icon size={size}>
      <SearchImage style={{ color: "black", width: "100%", height: "100%" }} />
    </Icon>
  );
}
