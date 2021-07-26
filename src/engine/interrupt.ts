import { dismissAllNotifications } from "engine/notification";

type Interruptible = {
  id: number;
  reject: (props: { reason: string }) => void;
};

let interruptibles: Interruptible[] = [];

export const interruptible = (params: Interruptible) => {
  interruptibles.push(params);
};

export default function interrupt() {
  interruptibles.forEach(({ id, reject }) => {
    // works for both timeout and intervals
    clearTimeout(id);
    reject({ reason: "interrupt" });
  });
  dismissAllNotifications();
  interruptibles = [];
}
