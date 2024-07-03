import "./App.css";

import { invoke } from "@withease/factories";
import { useUnit } from "effector-react";
import type { FunctionComponent } from "react";
import { CounterFactory, type CounterModel } from "./model";
import { combine } from "effector";

const counterOne = invoke(CounterFactory, {});
const counterTwo = invoke(CounterFactory, { initialValue: 10 });

const $counterTotal = combine(
  counterOne.$counter,
  counterTwo.$counter,
  (a, b) => a + b
);

const Counter: FunctionComponent<{ counter: CounterModel }> = ({ counter }) => {
  const { $counter, increment, decrement } = useUnit(counter);

  return (
    <div className="card">
      <button onClick={() => decrement(5)}>-5</button>
      <button onClick={() => decrement(1)}>-</button>
      <span>Counter value is {$counter}</span>
      <button onClick={() => increment(1)}>+</button>
      <button onClick={() => increment(5)}>+5</button>
    </div>
  );
};

const Total: FunctionComponent = () => {
  const total = useUnit($counterTotal);
  return <div>Total: {total} </div>;
};

function App() {
  return (
    <>
      <Counter counter={counterOne} />
      <Counter counter={counterTwo} />
      <Total />
    </>
  );
}

export default App;
