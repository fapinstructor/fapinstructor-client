import SearchImage from "@material-ui/icons/Search";

import { Icon } from "./Icon";

type SearchIconProps = {
  size: number;
};

export function SearchIcon({ size }: SearchIconProps) {
  return (
    <Icon size={size}>
      <SearchImage style={{ color: "black", width: "100%", height: "100%" }} />
    </Icon>
  );
}
