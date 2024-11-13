import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Task } from "../types";

const loadFromLocalStorage = (): Task[] => {
  const storedTasks = localStorage.getItem("@today/tasks");
  return storedTasks ? JSON.parse(storedTasks) : [];
};

const loadSelectedDay = (): string => {
  const storedSelectedDay = localStorage.getItem("@today/selectedDay");
  if (storedSelectedDay) {
    return storedSelectedDay;
  }

  const localDate = new Date();
  localDate.setHours(0, 0, 0, 0);
  return localDate.toISOString().split("T")[0];
};

interface TasksState {
  tasks: Task[];
  selectedDay: string;
  selectedCategory: string | null;
  searchQuery: string;
}

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: loadFromLocalStorage(),
    selectedDay: loadSelectedDay(),
    selectedCategory: null,
    searchQuery: "",
  } as TasksState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
      localStorage.setItem("@today/tasks", JSON.stringify(action.payload));
    },
    setSelectedDay(state, action: PayloadAction<string>) {
      state.selectedDay = action.payload;
      localStorage.setItem("@today/selectedDay", action.payload);
    },
    setSelectedCategory(state, action: PayloadAction<string | null>) {
      state.selectedCategory = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
      localStorage.setItem("@today/tasks", JSON.stringify(state.tasks));
    },
    toggleTask(state, action: PayloadAction<string>) {
      const taskId = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === taskId);
      if (taskIndex >= 0) {
        const task = state.tasks[taskIndex];
        task.completed = !task.completed;
        localStorage.setItem("@today/tasks", JSON.stringify(state.tasks));
      }
    },
    editTask(
      state,
      action: PayloadAction<{ id: string; updatedTask: Partial<Task> }>
    ) {
      const { id, updatedTask } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex >= 0) {
        state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updatedTask };
        localStorage.setItem("@today/tasks", JSON.stringify(state.tasks));
      }
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem("@today/tasks", JSON.stringify(state.tasks));
    },
  },
});

export const {
  setTasks,
  setSelectedDay,
  setSelectedCategory,
  setSearchQuery,
  addTask,
  toggleTask,
  editTask,
  deleteTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
