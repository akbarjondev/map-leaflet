import { configureStore } from "@reduxjs/toolkit";
import speedReducer from "./speed";

export default configureStore({
  reducer: {
    speedControl: speedReducer,
  },
});
