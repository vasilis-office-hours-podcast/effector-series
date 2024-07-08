import { createFactory } from "@withease/factories";
import {
  createEffect,
  createEvent,
  createStore,
  EventCallable,
  sample,
  type Store,
} from "effector";
import { testingInternals } from "../../shared/testing";

export type TimerFactorySettings = {
  timeout: Store<number>;
  tick: EventCallable<void>;
};

export const TimerFactory = createFactory(
  ({ timeout, tick }: TimerFactorySettings) => {
    const setup = createEvent();
    const teardown = createEvent();

    const $isRunning = createStore(false);
    const $intervalId = createStore<number | undefined>(undefined, {
      skipVoid: false,
    });

    const setupIntervalFx = createEffect((timeout: number) => {
      return setInterval(() => tick(), timeout);
    });

    const teardownIntervalFx = createEffect(clearInterval);

    sample({
      clock: setup,
      source: [$isRunning, timeout] as const,
      filter: ([isRunning]) => !isRunning,
      fn: ([, timeout]) => timeout,
      target: setupIntervalFx,
    });

    sample({
      clock: teardown,
      source: [$isRunning, $intervalId] as const,
      filter: ([isRunning]) => isRunning,
      fn: ([, intervalId]) => intervalId,
      target: teardownIntervalFx,
    });

    sample({
      clock: setupIntervalFx.doneData,
      target: $intervalId,
    });

    sample({
      clock: setup,
      fn: () => true,
      target: $isRunning,
    });

    $intervalId.reset(teardownIntervalFx.done);
    $isRunning.reset(teardownIntervalFx.done);

    return {
      $isRunning,
      setup,
      teardown,
      [testingInternals]: {
        teardownIntervalFx,
        $intervalId,
      },
    };
  }
);

export type TimerModel = ReturnType<typeof TimerFactory>;
