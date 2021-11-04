import styled, { keyframes } from "styled-components/macro";
import {
  calculateTickTime,
  ANIMATION_OFFSET_PIXELS,
  FLASH_ANIMATION_DURATION,
  TICK_ANIMATION_DURATION,
} from "@/components/organisms/BeatMeter/settings";

const BaseAnimation = styled.div<Keyframe>`
  animation-duration: ${(props) => props.duration};
  animation-timing-function: ${(props) => props.timingFunction};
  animation-delay: ${(props) => props.delay};
  animation-iteration-count: ${(props) => props.iterationCount};
  animation-direction: ${(props) => props.direction};
  animation-fill-mode: ${(props) => props.fillMode};
  animation-play-state: ${(props) => props.playState};
  display: ${(props) => props.display};
`;
BaseAnimation.defaultProps = {
  duration: "1s",
  timingFunction: "ease",
  delay: "0s",
  iterationCount: "1",
  direction: "normal",
  fillMode: "both",
  playState: "running",
  display: "block",
};

const SlideLeftAnimation = keyframes`
  from {
    right: 0;
  }
  to {
    right: calc(100% - 10px);
  }
`;

const FadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  50% {
    opacity: 100%;
  }
  to {
    opacity: 0;
  }
`;

export const HR = styled.hr`
  border-width: 1px 0;
  border-color: #3fbfa1;
  width: 100%;
  position: absolute;
  z-index: 1;
  box-shadow: 0px 0px 24px 3px #3fbfa1;
`;

export const Dot = styled(BaseAnimation)`
  position: absolute;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  z-index: 6;
  background: rgb(253, 255, 245);
  box-shadow: 0px 0px 24px 13px #3fbfa1;
`;

export const AnimatedDot = styled(Dot)`
  animation-name: ${SlideLeftAnimation};
  animation-timing-function: linear;
  animation-duration: ${TICK_ANIMATION_DURATION / 1000}s;
`;

export const Circle = styled.div`
  position: absolute;
  height: ${ANIMATION_OFFSET_PIXELS * 2}px;
  width: ${ANIMATION_OFFSET_PIXELS * 2}px;
  border: 1px solid #3fbfa1;
  border-radius: 50%;
  left: calc(50% - 25px);
  z-index: 3;
  box-shadow: 0px 0px 9px 2px #3fbfa1;
`;

export const CircleFlash = styled(BaseAnimation)`
  position: absolute;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  left: calc(50% - 25px);
  animation-timing-function: linear;
  border: 1px solid #3fbfa1;
  background-color: #3fbfa1;
  animation-name: ${FadeInAnimation};
  animation-duration: ${FLASH_ANIMATION_DURATION}s;
  animation-delay: ${calculateTickTime() / 1000}s;
  z-index: 3;
`;

export const Bar = styled.div`
  height: 60px;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  width: 100%;
`;
