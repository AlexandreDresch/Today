import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./task-slice";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export default store;
