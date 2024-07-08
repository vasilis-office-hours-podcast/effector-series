import "./App.css";

import { invoke } from "@withease/factories";
import { createEvent, sample } from "effector";
import { useUnit } from "effector-react";
import { Counter, CounterFactory } from "./features/counter";
import { TimerFactory } from "./features/timers";

const counterOne = invoke(CounterFactory, { initialValue: 1 });
const counterTwo = invoke(CounterFactory, { initialValue: 10 });

const tick = createEvent();
const timer = invoke(TimerFactory, {
  timeout: counterOne.$counter.map((x) => x * 1000),
  tick,
});

sample({
  clock: tick,
  fn: () => 1,
  target: counterTwo.increment,
});

function App() {
  const { setup, teardown, $isRunning: isRunning } = useUnit(timer);
  return (
    <>
      <Counter counter={counterOne} />
      <Counter counter={counterTwo} />
      <button onClick={() => setup()} disabled={isRunning}>
        Start
      </button>
      &nbsp;
      <button onClick={() => teardown()} disabled={!isRunning}>
        Stop
      </button>
    </>
  );
}

export default App;
