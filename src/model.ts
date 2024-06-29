import { createStore, createEvent, sample } from "effector";
import { createFactory } from "@withease/factories";

export const counterFactory = createFactory(() => {
  const $counter = createStore(0);

  $counter.watch((current) =>
    console.log(`Current value of $counter is ${current}.`)
  );

  const increment = createEvent();

  increment.watch(() => console.log(`Increment was triggered`));

  // $counter.on(increment, (current) => current + 1);

  sample({
    clock: increment,
    source: $counter,
    fn(current) {
      return current + 1;
    },
    target: $counter,
  });

  return {
    $counter,
    increment,
  };
});
