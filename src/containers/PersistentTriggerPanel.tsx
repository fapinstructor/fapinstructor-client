import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { ruinedOrgasm } from "game/actions/orgasm/ruin";
import { ProxyStoreConsumer } from "containers/StoreProvider";
import { ActionService } from "game/xstate/services";
import { edged } from "game/actions/orgasm/edge";

const useStyles = makeStyles((theme) => ({
  root: {
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

export default function PersistentTriggerPanel() {
  const classes = useStyles();

  return (
    <ProxyStoreConsumer>
      {(store) => (
        <div className={classes.root}>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            style={{ opacity: 0.8, margin: 10 }}
            disabled={store?.game.cooldown}
            onClick={() => {
              ActionService.execute(ruinedOrgasm);
            }}
          >
            Ruin
            <span className={classes.hotkey}>[r]</span>
          </Button>
          <Button
            variant="contained"
            color="inherit"
            size="medium"
            style={{ opacity: 0.8, margin: 10 }}
            disabled={store?.game.cooldown}
            onClick={() => {
              ActionService.execute(edged);
            }}
          >
            Edge
            <span className={classes.hotkey}>[e]</span>
          </Button>
        </div>
      )}
    </ProxyStoreConsumer>
  );
}
