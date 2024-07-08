import { createStore, createEvent, sample } from "effector";
import { createFactory } from "@withease/factories";

export type CounterSettings = {
  initialValue?: number;
};

export const CounterFactory = createFactory(
  ({ initialValue = 0 }: CounterSettings) => {
    const $counter = createStore(initialValue);

    const increment = createEvent<number>();
    const decrement = createEvent<number>();

    sample({
      clock: increment,
      source: $counter,
      fn(current, increase) {
        return current + increase;
      },
      target: $counter,
    });

    sample({
      clock: decrement,
      source: $counter,
      fn(current, decrease) {
        return current - decrease;
      },
      target: $counter,
    });

    return {
      $counter,
      increment,
      decrement,
    };
  }
);

export type CounterModel = ReturnType<typeof CounterFactory>;
