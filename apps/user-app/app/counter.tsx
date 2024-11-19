"use client";

import React from "react";
import {
  decrement,
  increment,
} from "../../../packages/store/src/features/balance/balanceSlice";
import { useAppDispatch, useAppSelector } from "@repo/store/reduxHooks";

const Counter = () => {
  const value = useAppSelector((state) => state.balance.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <p>{value}</p>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};

export default Counter;
