import "./App.css";

import { invoke } from "@withease/factories";
import { createEvent, sample } from "effector";
import { debug } from "patronum";
import { Counter, CounterFactory } from "./features/counter";
import { Timer, TimerFactory } from "./features/timers";

const counterOne = invoke(CounterFactory, { initialValue: 1 });
const counterTwo = invoke(CounterFactory, { initialValue: 10 });

const tick = createEvent();
const timer = invoke(TimerFactory, {
  timeout: counterOne.$counter.map((x) => x * 1000),
  tick,
});

const incrementCounterTwoBy1 = counterTwo.increment.prepend(() => 1);

sample({
  clock: tick,
  target: incrementCounterTwoBy1,
});

debug({ trace: true }, tick);
debug({ trace: true }, timer);

function App() {
  return (
    <>
      <Counter counter={counterOne} />
      <Counter counter={counterTwo} />
      <Timer timer={timer} />
    </>
  );
}

export default App;
