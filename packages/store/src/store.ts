import { configureStore } from "@reduxjs/toolkit";
import balanceReducer from "./features/balance/balanceSlice";
import userReducer from "./features/user/userSlice";

export const store = () => {
  return configureStore({
    reducer: {
      balance: balanceReducer,
      user: userReducer,
    },
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
