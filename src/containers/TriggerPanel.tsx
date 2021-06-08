import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { triggerHotkeys } from "engine/hotkeys";
import { useActionService, ActionService } from "game/xstate/services";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100vw",
    pointerEvents: "auto",
  },
  hotkey: {
    paddingLeft: "0.25rem",
    [theme.breakpoints.down("sm")]: {
      display: "none",
      paddingLeft: 0,
    },
  },
}));

export default function TriggerPanel() {
  const classes = useStyles();
  const [
    {
      context: { triggers },
    },
  ] = useActionService();

  return (
    <div className={classes.root}>
      {triggers &&
        triggers.map((trigger, index) => (
          <Button
            variant="contained"
            color="secondary"
            size="large"
            style={{ margin: 10 }}
            key={index}
            onClick={() => ActionService.execute(trigger)}
          >
            {trigger.label}

            {triggers.length === 1 ? (
              <span className={classes.hotkey}>[spacebar]</span>
            ) : (
              <span className={classes.hotkey}>[{triggerHotkeys[index]}]</span>
            )}
          </Button>
        ))}
    </div>
  );
}
