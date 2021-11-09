import { Fragment, useEffect, useState } from "react";

import { strokeServiceObserver } from "@/game/xstate/services";
import { StrokeMachineEvent } from "@/game/xstate/machines/strokeMachine";

import { TICK_ANIMATION_DURATION } from "./settings";
import { CircleFlash, Circle, AnimatedDot, HR, Bar } from "./styled-components";



function Dots() {
  const [dots, setDots] = useState<number[]>([]);
  const [observerId, setObserverId] = useState<number>();

  const handleEvent = (event: StrokeMachineEvent) => {
    switch (event.type) {
      case "QUEUE_STROKE": {
        // Remove dot
        const handle = window.setTimeout(() => {
          setDots((dots) => dots.slice(1));
        }, TICK_ANIMATION_DURATION);

        // Add dot
        setDots((dots) => [...dots, handle]);
        break;
      }
      case "CLEAR_STROKE_QUEUE": {
        setDots((dots) => {
          dots.forEach(clearTimeout);
          return [];
        });
        break;
      }
    }
  };

  useEffect(() => {
    setObserverId(strokeServiceObserver.subscribe(handleEvent));

    return () => {
      if (observerId) {
        dots.forEach(clearTimeout);
        strokeServiceObserver.unsubscribe(observerId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {dots.map((timestamp) => (
        <Fragment key={timestamp}>
          <CircleFlash />
          <AnimatedDot />
        </Fragment>
      ))}
    </>
  );
}

export function BeatMeter() {
  return (
    <Bar>
      <HR />
      <Circle />
      <Dots />
    </Bar>
  );
}
