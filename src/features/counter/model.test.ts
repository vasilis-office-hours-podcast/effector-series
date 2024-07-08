import { beforeEach, describe, expect, test } from "vitest";
import { CounterFactory, CounterModel } from "./model";

import { allSettled, fork } from "effector";
import { invoke } from "@withease/factories";

describe("Initialization tests", () => {
  test("Counter without initial value is initialized to 0", () => {
    const subject = invoke(CounterFactory, {});
    const scope = fork();

    expect(scope.getState(subject.$counter)).toBe(0);
  });

  test("Counter with initial value is initialized to that value", () => {
    const subject = invoke(CounterFactory, { initialValue: 10 });
    const scope = fork();

    expect(scope.getState(subject.$counter)).toBe(10);
  });
});

describe("Incrementing behaviours work", () => {
  let subject: CounterModel;
  beforeEach(() => {
    subject = invoke(CounterFactory, {});
  });

  test("Incrementing by 1 works", async () => {
    const scope = fork();

    await allSettled(subject.increment, { scope, params: 1 });

    expect(scope.getState(subject.$counter)).toBe(1);
  });

  test("Incrementing by 5 works", async () => {
    const scope = fork();

    await allSettled(subject.increment, { scope, params: 5 });

    expect(scope.getState(subject.$counter)).toBe(5);
  });
});

describe("Decrementing behaviours work", () => {
  let subject: CounterModel;
  beforeEach(() => {
    subject = invoke(CounterFactory, {});
  });

  test("Decrementing by 1 works", async () => {
    const scope = fork();

    await allSettled(subject.decrement, { scope, params: 1 });

    expect(scope.getState(subject.$counter)).toBe(-1);
  });

  test("Decrementing by 5 works", async () => {
    const scope = fork();

    await allSettled(subject.decrement, { scope, params: 5 });

    expect(scope.getState(subject.$counter)).toBe(-5);
  });
});
