import React, { useState } from "react";
import store from "store";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import executeAction from "engine/executeAction";
import { ruinedOrgasm } from "game/actions/orgasm/ruin";
import punishment from "../game/actions/punishment";

const useStyles = makeStyles({
  root: {
    pointerEvents: "auto",
  },
});

export default function PersistentTriggerPanel() {
  const classes = useStyles();
  const [ruinedOrgasmDisabled, setRuinedOrgasmDisabled] = useState(false);
  const [edgeDisabled, setEdgeDisabled] = useState(false);

  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        color="primary"
        size="medium"
        style={{ opacity: 0.8, margin: 10 }}
        disabled={ruinedOrgasmDisabled}
        onClick={() => {
          setRuinedOrgasmDisabled(true);
          executeAction(ruinedOrgasm, true).then(() => {
            setRuinedOrgasmDisabled(false);
          });
        }}
      >
        Ruin
      </Button>
      <Button
        variant="contained"
        color="inherit"
        size="medium"
        style={{ opacity: 0.8, margin: 10 }}
        disabled={edgeDisabled}
        onClick={() => {
          setEdgeDisabled(true);
          store.game.edges++;
          executeAction(punishment, true).then(() => {
            setEdgeDisabled(false);
          });
        }}
      >
        Edge
      </Button>
    </div>
  );
}
