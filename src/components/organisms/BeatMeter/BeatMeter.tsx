// TODO: Clean this file up
import React from "react";
import type {
  StrokeEmitterObservable,
  StrokeEvent,
} from "game/loops/strokeEmitter";
import { TIME_DELAY } from "components/organisms/BeatMeter/settings";
import { CircleFlash, Circle, AnimatedDot, HR, Bar } from "./styled-components";

export type BeatMeterProps = {
  strokeEmitterObservable: StrokeEmitterObservable;
};

// Using a class here because we want to clear timeouts when unmounting
export default class BeatMeter extends React.Component<BeatMeterProps> {
  sub = 0;
  timeouts: number[] = [];

  state = {
    dots: [],
  };

  constructor(props: BeatMeterProps) {
    super(props);
    this.handleStrokeEvent = this.handleStrokeEvent.bind(this);
  }

  componentDidMount() {
    this.sub = this.props.strokeEmitterObservable.subscribe(
      this.handleStrokeEvent
    );
  }

  componentWillUnmount() {
    this.props.strokeEmitterObservable.unsubscribe(this.sub);

    this.timeouts.forEach((timeout) => {
      clearTimeout(timeout);
    });
  }

  handleStrokeEvent(event: StrokeEvent) {
    switch (event.type) {
      case "clear":
        this.setState({ dots: [] });
        break;
      case "emit":
        if (event.strokeTime) {
          // add dot
          this.setState({ dots: [...this.state.dots, event.strokeTime] });

          // remove dot
          const timeout = setTimeout(() => {
            this.setState({ dots: this.state.dots.slice(1) });
          }, TIME_DELAY);
          this.timeouts.push(timeout);
        }
        break;
    }
  }

  render() {
    return (
      <Bar>
        <HR />
        <Circle />
        {this.state.dots.map((timestamp) => (
          <React.Fragment key={timestamp}>
            <CircleFlash />
            <AnimatedDot />
          </React.Fragment>
        ))}
      </Bar>
    );
  }
}

// export default function BeatMeter({ strokeEmitterObservable }: BeatMeterProps) {
//   const [dots, setDots] = useState<number[]>([]);

//   // add dots
//   useEffect(() => {
//     const subscriptionId = strokeEmitterObservable.subscribe((event) => {
//       switch (event.type) {
//         case "clear":
//           setDots([]);
//           break;
//         case "emit":
//           if (event.strokeTime) {
//             // add dot
//             setDots((d) => [...d, event.strokeTime]);

//             // remove dot
//             setTimeout(() => {
//               setDots((d) => d.slice(1));
//             }, TIME_DELAY);
//           }
//           break;
//       }
//     });

//     return () => {
//       strokeEmitterObservable.unsubscribe(subscriptionId);
//     };
//   }, [strokeEmitterObservable]);

//   return (
//     <Bar>
//       <HR />
//       <Circle />
//       {dots.map((timestamp) => (
//         <React.Fragment key={timestamp}>
//           <CircleFlash />
//           <AnimatedDot />
//         </React.Fragment>
//       ))}
//     </Bar>
//   );
// }
