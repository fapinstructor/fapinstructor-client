import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Switch,
  FormControlLabel,
} from "@material-ui/core";
import DownIcon from "@material-ui/icons/ArrowDropDown";
import UpIcon from "@material-ui/icons/ArrowDropUp";
import elapsedGameTime from "game/utils/elapsedGameTime";
import { GripStrengthString } from "game/enums/GripStrength";
import { StrokeStyles } from "game/enums/StrokeStyle";
import logo from "images/logo.svg";
import store, { LocalStorage } from "store";
import { ProxyStoreConsumer } from "containers/StoreProvider";

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

// TODO: Breakout flags out of localstorage
type Flags = keyof LocalStorage;

export default function StatusPanel() {
  const [open, setOpen] = useState(true);
  const classes = useStyles();

  const handleCheckChange = (name: Flags) => (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    try {
      localStorage.setItem(name, checked.toString());
    } catch (e) {
      // local storage may not be supported on some devices
    }
    store.localStorage[name] = checked;
    console.log(`Toggle ${name}: ${String(checked)}`);
  };

  type RenderToggleProps = {
    id: Flags;
    label: string;
    checked: boolean;
  };

  const renderToggle = ({ id, label, checked }: RenderToggleProps) => {
    return (
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={handleCheckChange(id)}
            value={id}
          />
        }
        classes={{
          label: classes.toggle,
        }}
        label={label}
      />
    );
  };

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
              enableVoice,
              enableMoans,
              enableTicks,
              enableBeatMeter,
              videoMuted,
            } = store.localStorage;

            const {
              gripStrength,
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
                    <Label value="Elapsed Time (min)" />
                    <Label value="Stroke Grip" />
                    <Label value="Stroke Style" />
                    {buttPlugInserted && <Label value="Butt Plug" />}
                    {rubberBands > 0 && <Label value="Rubberbands" />}
                    {clothespins > 0 && <Label value="Clothepins" />}
                    {cockAndBallsBound && <Label value="Cock & Balls" />}
                    {edges > 0 && <Label value="Edges" />}
                    {ruins > 0 && <Label value="Ruins" />}
                    {orgasms > 0 && <Label value="Orgasms" />}
                  </div>
                  <div>
                    <Label value={elapsedGameTime("minutes").toString()} />
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
                  {renderToggle({
                    id: "enableVoice",
                    checked: enableVoice,
                    label: "Voice",
                  })}
                  {renderToggle({
                    id: "enableMoans",
                    checked: enableMoans,
                    label: "Moans",
                  })}
                  {renderToggle({
                    id: "videoMuted",
                    checked: videoMuted,
                    label: "Mute Videos",
                  })}
                  <div>
                    {renderToggle({
                      id: "enableTicks",
                      checked: enableTicks,
                      label: "Metronome",
                    })}
                    {renderToggle({
                      id: "enableBeatMeter",
                      checked: enableBeatMeter,
                      label: "Beat Meter",
                    })}
                  </div>
                </div>
              </div>
            );
          }}
        </ProxyStoreConsumer>
      )}
    </div>
  );
}
