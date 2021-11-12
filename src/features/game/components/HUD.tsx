import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import { selectEnableBeatMeter } from "@/common/store/settings";

import PersistentTriggerPanel from "./PersistentTriggerPanel";
import StatusPanel from "./StatusPanel";
import TriggerPanel from "./TriggerPanel";
import { BeatMeter } from "./BeatMeter";
import { HUDButtons } from "./HUDButtons";

type HUDProps = {
  gameId?: string;
};

const useStyles = makeStyles(() => ({
  root: {
    position: "absolute",
    height: "100vh",
    width: "100vw",
    pointerEvents: "none",
  },
}));

export function HUD({ gameId }: HUDProps) {
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
              <HUDButtons gameId={gameId} />
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
