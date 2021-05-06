import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import executeAction from "engine/executeAction";
import { ProxyStoreConsumer } from "containers/StoreProvider";
import { triggerHotkeys } from "engine/hotkeys";

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

  return (
    <ProxyStoreConsumer>
      {(store) => (
        <div className={classes.root}>
          {store?.engine?.actionTriggers &&
            store.engine.actionTriggers.map((trigger, index) => (
              <Button
                variant="contained"
                color="secondary"
                size="large"
                style={{ margin: 10 }}
                key={index}
                onClick={() => executeAction(trigger)}
              >
                {trigger.label}

                {store.engine.actionTriggers?.length === 1 ? (
                  <span className={classes.hotkey}>[spacebar]</span>
                ) : (
                  <span className={classes.hotkey}>
                    [{triggerHotkeys[index]}]
                  </span>
                )}
              </Button>
            ))}
        </div>
      )}
    </ProxyStoreConsumer>
  );
}
