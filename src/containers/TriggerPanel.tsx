import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import executeAction from "engine/executeAction";
import { ProxyStoreConsumer } from "containers/StoreProvider";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100vw",
    pointerEvents: "auto",
  },
});

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
              </Button>
            ))}
        </div>
      )}
    </ProxyStoreConsumer>
  );
}
