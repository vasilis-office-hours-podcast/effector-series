import { invoke } from "@withease/factories";
import { allSettled, createEvent, createStore, fork } from "effector";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { testingInternals } from "../../shared/testing";
import { TimerFactory } from "./model";

describe("Initialization tests", () => {
  test("Timer gets initialized correctly", async () => {
    const $timeout = createStore(1);
    const tick = createEvent();
    const subject = invoke(TimerFactory, { timeout: $timeout, tick });
    const scope = fork();

    expect(scope.getState(subject.$isRunning)).toBe(false);
    expect(
      scope.getState(subject[testingInternals].$intervalId)
    ).toBeUndefined();
  });
});

describe("Running Test", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("Starting the timer executes the tick", async () => {
    const $timeout = createStore(1);
    const tick = createEvent();
    const subject = invoke(TimerFactory, { timeout: $timeout, tick });

    const scope = fork();

    const target = vi.fn();
    tick.watch(target);

    expect(target).toHaveBeenCalledTimes(0);
    expect(scope.getState(subject.$isRunning)).toBeFalsy();
    expect(
      scope.getState(subject[testingInternals].$intervalId)
    ).toBeUndefined();

    await allSettled(subject.setup, { scope });

    expect(scope.getState(subject[testingInternals].$intervalId)).toBeDefined();
    expect(scope.getState(subject.$isRunning)).toBeTruthy();
    expect(target).toHaveBeenCalledTimes(0);

    vi.advanceTimersByTime(2);
    expect(target).toHaveBeenCalledTimes(2);

    await allSettled(subject.teardown, { scope });
    expect(
      scope.getState(subject[testingInternals].$intervalId)
    ).toBeUndefined();
    expect(scope.getState(subject.$isRunning)).toBeFalsy();

    vi.advanceTimersByTime(2);

    expect(target).toHaveBeenCalledTimes(2);
  });
});
