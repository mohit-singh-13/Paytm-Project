import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateType = {
  id: number | null;
  name: string | null;
  email: string | null;
};

const initialState: InitialStateType = {
  id: null,
  name: null,
  email: null,
};

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser: (state, actions: PayloadAction<InitialStateType>) => {
      state.id = actions.payload.id;
      state.name = actions.payload.name;
      state.email = actions.payload.email;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
