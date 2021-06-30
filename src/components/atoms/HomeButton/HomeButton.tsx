import React from "react";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import { useHistory } from "react-router-dom";
import { Tooltip } from "@material-ui/core";

export default function HomeButton() {
  const history = useHistory();

  const handleClick = () => {
    history.push("/");
  };

  return (
    <Tooltip title="Home" placement="bottom">
      <IconButton color="inherit" onClick={handleClick}>
        <HomeIcon />
      </IconButton>
    </Tooltip>
  );
}
