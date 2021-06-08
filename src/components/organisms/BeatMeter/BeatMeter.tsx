import React, { useEffect, useState } from "react";
import { TIME_DELAY } from "components/organisms/BeatMeter/settings";
import { CircleFlash, Circle, AnimatedDot, HR, Bar } from "./styled-components";
import { strokeServiceObserver } from "game/xstate/services";
import { StrokeMachineEvent } from "game/xstate/machines/strokeMachine";

function Dots() {
  const [dots, setDots] = useState<number[]>([]);
  const [observerId, setObserverId] = useState<number>();

  const handleEvent = (event: StrokeMachineEvent) => {
    switch (event.type) {
      case "QUEUE_STROKE": {
        // Remove dot
        const handle = setTimeout(() => {
          setDots((dots) => dots.slice(1));
        }, TIME_DELAY);

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
        <React.Fragment key={timestamp}>
          <CircleFlash />
          <AnimatedDot />
        </React.Fragment>
      ))}
    </>
  );
}

export default function BeatMeter() {
  return (
    <Bar>
      <HR />
      <Circle />
      <Dots />
    </Bar>
  );
}
