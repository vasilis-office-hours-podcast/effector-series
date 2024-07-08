import { useUnit } from "effector-react";
import { FunctionComponent } from "react";
import type { TimerModel } from "./model";

export type TimerProps = { timer: TimerModel };

export const Timer: FunctionComponent<TimerProps> = ({ timer }) => {
  const { setup, teardown, $isRunning: isRunning } = useUnit(timer);
  return (
    <>
      <button onClick={() => setup()} disabled={isRunning}>
        Start
      </button>
      &nbsp;
      <button onClick={() => teardown()} disabled={!isRunning}>
        Stop
      </button>
    </>
  );
};
