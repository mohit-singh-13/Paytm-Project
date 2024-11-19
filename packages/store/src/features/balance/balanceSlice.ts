import { createSlice } from "@reduxjs/toolkit";

export const balanceSlice = createSlice({
  name: "Balance",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 5;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = balanceSlice.actions;
export default balanceSlice.reducer;
