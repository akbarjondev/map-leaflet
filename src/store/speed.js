import { createSlice } from "@reduxjs/toolkit";

const speedSlice = createSlice({
  name: "control_speed",
  initialState: {
    speed: 3000,
  },
  reducers: {
    control: (state, action) => {
      state.speed = action.payload;
    },
  },
});

export const { control } = speedSlice.actions;
export default speedSlice.reducer;
