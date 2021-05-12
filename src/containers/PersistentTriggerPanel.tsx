import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { ruinedOrgasm } from "game/actions/orgasm/ruin";
import punishment from "../game/actions/punishment";
import { ProxyStoreConsumer } from "containers/StoreProvider";
import { ActionService } from "game/xstate/services";

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
            disabled={store?.game.ruining}
            onClick={() => {
              if (!store) {
                return;
              }
              store.game.ruining = true;
              ActionService.execute(ruinedOrgasm, true).then((interrupted) => {
                if (!interrupted) {
                  store.game.ruining = false;
                }
              });
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
            disabled={store?.game.edging}
            onClick={() => {
              if (!store) {
                return;
              }
              store.game.edging = true;
              store.game.edges++;
              ActionService.execute(punishment, true).then((interrupted) => {
                if (!interrupted) {
                  store.game.edging = false;
                }
              });
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
