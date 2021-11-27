import { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Switch,
  FormControlLabel,
} from "@material-ui/core";
import DownIcon from "@material-ui/icons/ArrowDropDown";
import UpIcon from "@material-ui/icons/ArrowDropUp";

import elapsedGameTime from "@/game/utils/elapsedGameTime";
import { StrokeStyles } from "@/game/enums/StrokeStyle";
import logo from "@/assets/images/logo.svg";
import { ProxyStoreConsumer } from "@/providers/ProxyStoreProvider";
import { selectSettings, toggleSetting } from "@/stores/settings";
import { useGripService } from "@/game/xstate/services";
import { GripStrengthString } from "@/game/xstate/machines/gripMachine";
import useForceUpdate from "@/hooks/useForceUpdate";

const useStyles = makeStyles({
  root: {
    padding: 5,
    background: "rgba(0, 0, 0, 0.6)",
    pointerEvents: "auto",
  },
  header: {
    display: "flex",
    alignItems: "center",
    color: "white",
  },
  labels: {
    display: "flex",
  },
  toggle: {
    color: "white",
  },
});

type LabelProps = {
  value: string;
};

function Label({ value }: LabelProps) {
  return (
    <Typography color="secondary" variant="body2">
      {value}
    </Typography>
  );
}

type ToggleProps = {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
};

const useSwitchStyles = makeStyles({
  toggle: {
    color: "white",
  },
});

function Toggle({ id, label, checked, onChange }: ToggleProps) {
  const classes = useSwitchStyles();

  return (
    <FormControlLabel
      control={<Switch value={id} checked={checked} onChange={onChange} />}
      classes={{
        label: classes.toggle,
      }}
      label={label}
    />
  );
}

export default memo(function StatusPanel() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const dispatch = useDispatch();
  const settings = useSelector(selectSettings);

  const [
    {
      context: { gripStrength },
    },
  ] = useGripService();

  const forceUpdate = useForceUpdate();

  // TODO: Disabling because every TICK event will cause a render
  // const [
  //   {
  //     context: { strokeSpeed },
  //   },
  // ] = useStrokeService();

  // Force update to refresh elapsed time as that value has no event.
  useEffect(() => {
    const refreshInterval = window.setInterval(() => forceUpdate(), 60_000);

    return () => clearInterval(refreshInterval);
  }, [forceUpdate]);

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Button
          color="inherit"
          style={{ textTransform: "none", width: "100%" }}
          onClick={() => setOpen(!open)}
        >
          <img style={{ width: 25, marginRight: 10 }} src={logo} alt="Logo" />
          <Typography color="inherit" variant="body2">
            Fap Instructor
          </Typography>
          {open ? <DownIcon /> : <UpIcon />}
        </Button>
      </div>
      {open && (
        <ProxyStoreConsumer>
          {(store) => {
            if (!store) {
              return;
            }

            const {
              strokeStyle,
              buttPlugInserted,
              rubberBands,
              clothespins,
              cockAndBallsBound,
              edges,
              ruins,
              orgasms,
            } = store.game;

            return (
              <div>
                <div className={classes.labels}>
                  <div style={{ marginRight: 10 }}>
                    <Label value="Elapsed Time:" />
                    {/* <Label value="Stroke Speed:" /> */}
                    <Label value="Stroke Grip:" />
                    <Label value="Stroke Style:" />
                    {buttPlugInserted && <Label value="Butt Plug:" />}
                    {rubberBands > 0 && <Label value="Rubberbands:" />}
                    {clothespins > 0 && <Label value="Clothespins:" />}
                    {cockAndBallsBound && <Label value="Cock & Balls:" />}
                    {edges > 0 && <Label value="Edges:" />}
                    {ruins > 0 && <Label value="Ruins:" />}
                    {orgasms > 0 && <Label value="Orgasms:" />}
                  </div>
                  <div>
                    <Label value={`${elapsedGameTime()} min`} />
                    {/* <Label value={`${strokeSpeed.toFixed(2)} per sec`} /> */}
                    <Label value={GripStrengthString[gripStrength]} />
                    <Label value={StrokeStyles[strokeStyle].label} />
                    {buttPlugInserted && <Label value="Inserted" />}
                    {rubberBands > 0 && <Label value={String(rubberBands)} />}
                    {clothespins > 0 && <Label value={String(clothespins)} />}
                    {cockAndBallsBound && <Label value="Bound" />}
                    {edges > 0 && <Label value={String(edges)} />}
                    {ruins > 0 && <Label value={String(ruins)} />}
                    {orgasms > 0 && <Label value={String(orgasms)} />}
                  </div>
                </div>
                <div>
                  <Toggle
                    id="enableVoice"
                    label="Voice"
                    checked={settings.voice}
                    onChange={() => dispatch(toggleSetting("voice"))}
                  />
                  <Toggle
                    id="enableMoans"
                    label="Moans"
                    checked={settings.moans}
                    onChange={() => dispatch(toggleSetting("moans"))}
                  />
                  <Toggle
                    id="enableVideoAudio"
                    label="Mute Videos"
                    checked={!settings.videoAudio}
                    onChange={() => dispatch(toggleSetting("videoAudio"))}
                  />
                  <div>
                    <Toggle
                      id="enableTicks"
                      label="Metronome"
                      checked={settings.ticks}
                      onChange={() => dispatch(toggleSetting("ticks"))}
                    />
                    <Toggle
                      id="enableBeatMeter"
                      label="Beat Meter"
                      checked={settings.beatMeter}
                      onChange={() => dispatch(toggleSetting("beatMeter"))}
                    />
                  </div>
                </div>
              </div>
            );
          }}
        </ProxyStoreConsumer>
      )}
    </div>
  );
});
