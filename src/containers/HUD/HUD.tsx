import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import BeatMeter from "components/organisms/BeatMeter";
import PersistentTriggerPanel from "containers/PersistentTriggerPanel";
import StatusPanel from "containers/StatusPanel";
import TriggerPanel from "containers/TriggerPanel";
import { selectEnableBeatMeter } from "common/store/settings";
import HUDButtons from "./HUDButtons";

const useStyles = makeStyles(() => ({
  root: {
    position: "absolute",
    height: "100vh",
    width: "100vw",
    pointerEvents: "none",
  },
}));

export default function HUD() {
  const classes = useStyles();
  const enableBeatMeter = useSelector(selectEnableBeatMeter);

  return (
    <div className={classes.root}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              width: "100%",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <div>
              <StatusPanel />
              <PersistentTriggerPanel />
            </div>
            <div>
              <HUDButtons />
            </div>
          </div>
        </div>
        <div>
          <TriggerPanel />
          {enableBeatMeter && <BeatMeter />}
        </div>
      </div>
    </div>
  );
}
