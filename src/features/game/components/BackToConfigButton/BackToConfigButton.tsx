import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

export function BackToConfigButton() {
  const history = useHistory();

  const handleBackToConfig = () => {
    history.push("/");
  };

  return (
    <Button onClick={handleBackToConfig} variant="contained" color="secondary">
      Configure game
    </Button>
  );
}
