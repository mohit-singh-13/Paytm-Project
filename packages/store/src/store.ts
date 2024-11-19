import { configureStore } from "@reduxjs/toolkit";
import balanceReducer from "./features/balance/balanceSlice";

export const store = () => {
  return configureStore({
    reducer: {
      balance: balanceReducer,
    },
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
