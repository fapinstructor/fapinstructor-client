import { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { ActionService } from "game/xstate/services";
import useWindowEvent from "hooks/useWindowEvent";
import { Action } from "game/xstate/machines/actionMachine";

const useStyles = makeStyles((theme) => ({
  hotkey: {
    paddingLeft: "0.25rem",
    [theme.breakpoints.down("sm")]: {
      display: "none",
      paddingLeft: 0,
    },
  },
}));

type TriggerButtonProps = {
  action: Action;
  hotkey: string;
};

export default function TriggerButton({ action, hotkey }: TriggerButtonProps) {
  const classes = useStyles();

  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === hotkey && !event.repeat) {
        ActionService.execute(action);
      }
    },
    [action, hotkey]
  );
  useWindowEvent("keydown", handleKeydown);

  return (
    <Button
      variant="contained"
      color="secondary"
      size="large"
      onClick={() => ActionService.execute(action)}
    >
      {action.label}
      <span className={classes.hotkey}>
        [{hotkey === " " ? "spacebar" : hotkey}]
      </span>
    </Button>
  );
}
