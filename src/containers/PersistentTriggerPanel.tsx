import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import store from "store";
import useWindowEvent from "hooks/useWindowEvent";
import { ActionService } from "game/xstate/services";
import { ProxyStoreConsumer } from "containers/StoreProvider";
import { edged } from "game/actions/orgasm/edge";
import { accidentallyRuined } from "game/actions/orgasm/ruin";

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

export default React.memo(function PersistentTriggerPanel() {
  const classes = useStyles();

  const handleKeydown = React.useCallback((event: KeyboardEvent) => {
    if (store.game.cooldown || event.repeat) {
      return;
    }

    switch (event.key) {
      case "r": {
        ActionService.execute(accidentallyRuined);
        break;
      }
      case "e": {
        ActionService.execute(edged);
        break;
      }
    }
  }, []);
  useWindowEvent("keydown", handleKeydown);

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
              ActionService.execute(accidentallyRuined);
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
});
