import { createSlice } from "@reduxjs/toolkit";

const speedSlice = createSlice({
  name: "control_speed",
  initialState: {
    speed: 10,
  },
  reducers: {
    control: (state, action) => {
      state.speed = action.payload.control;
    },
  },
});

export const { control } = speedSlice.actions;
export default speedSlice.reducer;
