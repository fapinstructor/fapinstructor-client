import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

type StyleProps = {
  duration?: number;
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    position: "relative",
  },
  progress: {
    height: "100%",
    background: theme.palette.secondary.main,
    animationName: "$progress",
    animationTimingFunction: "linear",
    animationDuration: ({ duration }: StyleProps) => `${duration}ms`,
  },
  "@keyframes progress": {
    from: {
      width: "0%",
    },
    to: {
      width: "100%",
    },
  },
}));

export type ProgressBarProps = {
  className?: string;
  duration: number;
};

export default function ProgressBar({ className, duration }: ProgressBarProps) {
  const classes = useStyles({ duration });

  return (
    <div className={classes.root}>
      <div className={clsx(classes.progress, className)} />
    </div>
  );
}
