import * as React from "react";
import { Button, FormControl } from "@material-ui/core";
import styled from "styled-components/macro";

import theme from "theme";
import { getRandomBoolean } from "utils/math";
import store from "store";
import {
  analTasks,
  cbtTasks,
  ceiTasks,
  nippleTasks,
  speedTasks,
  strokeStyleTasks,
  Task,
  tasks,
  SpeedTasks,
  StrokeStyleTasks,
  CbtTasks,
  AnalTasks,
  CeiTasks,
  NippleTasks,
} from "configureStore";
import Group from "components/molecules/Group";
import TaskGroup from "../TaskGroup";

const TaskContainer = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;

  @media screen and (${theme.breakpoint.mobile.down}) {
    flex-direction: column;
  }
`;

function selectedTasks(queryTasks: Task[]) {
  return queryTasks.filter((task) => store.config.tasks[task]);
}

function handleToggleTask(toggledTask: string) {
  store.config.tasks[toggledTask as Task] =
    !store.config.tasks[toggledTask as Task];
}

function handleToggleAllTasks(tasks: string[], toggle: boolean) {
  tasks.forEach((task) => {
    store.config.tasks[task as Task] = toggle;
  });
}

function handleRandomizeTasks() {
  tasks.forEach((task) => {
    store.config.tasks[task] = getRandomBoolean();
  });
}

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
  return (
    <Group title="Tasks">
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleRandomizeTasks}
      >
        Randomize
      </Button>
      <TaskContainer>
        <FormControl>
          <TaskGroup
            label="Speed"
            onToggleTask={handleToggleTask}
            onToggleAllTasks={handleToggleAllTasks}
            selectedTasks={selectedTasks(speedTasks)}
            tasks={speedTasksGroup}
          />
        </FormControl>
        <FormControl>
          <TaskGroup
            label="Stroke Style"
            onToggleTask={handleToggleTask}
            onToggleAllTasks={handleToggleAllTasks}
            selectedTasks={selectedTasks(strokeStyleTasks)}
            tasks={strokeStyleTasksGroup}
          />
        </FormControl>
        <TaskGroup
          label="Cock & Ball Torture"
          onToggleTask={handleToggleTask}
          onToggleAllTasks={handleToggleAllTasks}
          selectedTasks={selectedTasks(cbtTasks)}
          tasks={cbtTasksGroup}
        />
        <TaskGroup
          label="Cum Eating"
          onToggleTask={handleToggleTask}
          onToggleAllTasks={handleToggleAllTasks}
          selectedTasks={selectedTasks(ceiTasks)}
          tasks={ceiTasksGroup}
        />
        <TaskGroup
          label="Anal"
          onToggleTask={handleToggleTask}
          onToggleAllTasks={handleToggleAllTasks}
          selectedTasks={selectedTasks(analTasks)}
          tasks={analTasksGroup}
        />
        <TaskGroup
          label="Nipples"
          onToggleTask={handleToggleTask}
          onToggleAllTasks={handleToggleAllTasks}
          selectedTasks={selectedTasks(nippleTasks)}
          tasks={nippleTasksGroup}
        />
      </TaskContainer>
    </Group>
  );
}
