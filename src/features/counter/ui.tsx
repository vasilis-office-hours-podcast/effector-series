import { useUnit } from "effector-react";
import type { FunctionComponent } from "react";
import type { CounterModel } from "./model";

export const Counter: FunctionComponent<{ counter: CounterModel }> = ({
  counter,
}) => {
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
