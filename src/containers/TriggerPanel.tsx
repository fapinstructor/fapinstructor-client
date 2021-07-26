import { makeStyles } from "@material-ui/core/styles";
import { useActionService } from "game/xstate/services";
import TriggerButton from "./TriggerButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100vw",
    pointerEvents: "auto",
    gap: "1rem",
  },
}));

enum TriggerHotKeys {
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
}

export default function TriggerPanel() {
  const classes = useStyles();
  const [
    {
      context: { triggers },
    },
  ] = useActionService();

  return (
    <div className={classes.root}>
      {triggers.length === 1 ? (
        <TriggerButton action={triggers[0]} hotkey=" " />
      ) : (
        triggers.map((trigger, index) => (
          <TriggerButton
            key={index}
            action={trigger}
            hotkey={TriggerHotKeys[index]}
          />
        ))
      )}
    </div>
  );
}
