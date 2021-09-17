import { Button } from "@material-ui/core";
import styled from "styled-components/macro";

import theme from "theme";
import {
  Task,
  SpeedTasks,
  StrokeStyleTasks,
  CbtTasks,
  AnalTasks,
  CeiTasks,
  NippleTasks,
  TaskConfig,
} from "configureStore";
import Group from "components/molecules/Group";
import TaskGroup from "../TaskGroup";
import { useFormikContext } from "formik";
import { getRandomBoolean } from "utils/math";

const TaskContainer = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;

  @media screen and (${theme.breakpoint.mobile.down}) {
    flex-direction: column;
  }
`;

type TaskGroupHash<T extends Task> = { [key in T]: string };

const speedTasksGroup: TaskGroupHash<SpeedTasks> = {
  doubleStrokes: "Double Strokes",
  halvedStrokes: "Halved Strokes",
  teasingStrokes: "Teasing Strokes",
  accelerationCycles: "Acceleration Cycles",
  randomBeat: "Random Beats",
  randomStrokeSpeed: "Random Stroke Speed",
  redLightGreenLight: "Red Light Green Light",
  clusterStrokes: "Cluster Strokes",
  gripChallenge: "Grip Challenge",
};

const strokeStyleTasksGroup: TaskGroupHash<StrokeStyleTasks> = {
  dominant: "Dominant",
  nondominant: "Nondominant",
  headOnly: "Head Only",
  shaftOnly: "Shaft Only",
  gripAdjustments: "Grip Adjustments",
  overhandGrip: "Overhand Grip",
  bothHands: "Both Hands",
  handsOff: "Hands Off",
};

const cbtTasksGroup: TaskGroupHash<CbtTasks> = {
  bindCockBalls: "Bind Cock and Balls",
  rubberBands: "Rubber Bands",
  clothespins: "Clothespins",
  headPalming: "Head Palming",
  icyHot: "Icy Hot",
  toothpaste: "Toothpaste",
  ballSlaps: "Ball Slaps",
  squeezeBalls: "Squeeze Balls",
  breathPlay: "Breath Play",
  scratching: "Scratching",
  flicking: "Flicking",
  cbtIce: "Ice cubes",
};

const ceiTasksGroup: TaskGroupHash<CeiTasks> = {
  precum: "Precum",
};

const analTasksGroup: TaskGroupHash<AnalTasks> = {
  buttplug: "Butt Plug",
};

const nippleTasksGroup: TaskGroupHash<NippleTasks> = {
  rubNipples: "Rub Nipples",
  nipplesAndStroke: "Nipples and Stroking",
};

export default function TaskStep() {
  // TODO: Use form type
  const form = useFormikContext<{
    tasks: TaskConfig;
  }>();

  function randomizeTasks() {
    Object.keys(form.values.tasks).forEach((task) => {
      form.setFieldValue(`tasks.${task}`, getRandomBoolean(), false);
    });
  }

  return (
    <Group title="Tasks">
      <Button
        className="stack-skip"
        variant="outlined"
        color="secondary"
        onClick={randomizeTasks}
      >
        Randomize
      </Button>
      <TaskContainer>
        <TaskGroup label="Speed" tasks={speedTasksGroup} />
        <TaskGroup label="Stroke Style" tasks={strokeStyleTasksGroup} />
        <TaskGroup label="Cock & Ball Torture" tasks={cbtTasksGroup} />
        <TaskGroup label="Cum Eating" tasks={ceiTasksGroup} />
        <TaskGroup label="Anal" tasks={analTasksGroup} />
        <TaskGroup label="Nipples" tasks={nippleTasksGroup} />
      </TaskContainer>
    </Group>
  );
}
