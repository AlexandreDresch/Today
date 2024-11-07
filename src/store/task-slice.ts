import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../types";

// Função para recuperar dados do localStorage com fallback para array vazio
const loadFromLocalStorage = (): Task[] => {
  const storedTasks = localStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : [];
};

// Função para recuperar o dia selecionado do localStorage ou usar o valor padrão
const loadSelectedDayFromLocalStorage = (): string => {
  const storedDay = localStorage.getItem("selectedDay");
  return storedDay || new Date().toLocaleString("en-US", { weekday: "long" });
};

interface TasksState {
  tasks: Task[];
  selectedDay: string;
  selectedCategory: string | null; // Permitir tanto string quanto null
  searchQuery: string;
}

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: loadFromLocalStorage(),
    selectedDay: loadSelectedDayFromLocalStorage(),
    selectedCategory: null, // Aqui, `selectedCategory` pode ser null ou string
    searchQuery: "",
  } as TasksState, // Especificando explicitamente o tipo do estado
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
      // Armazena as tarefas no localStorage
      localStorage.setItem("tasks", JSON.stringify(action.payload));
    },
    setSelectedDay(state, action: PayloadAction<string>) {
      state.selectedDay = action.payload;
      // Armazena o dia selecionado no localStorage
      localStorage.setItem("selectedDay", action.payload);
    },
    setSelectedCategory(state, action: PayloadAction<string | null>) {
      state.selectedCategory = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload); // Adiciona a nova tarefa à lista
      localStorage.setItem("tasks", JSON.stringify(state.tasks)); // Atualiza o localStorage
    },
    editTask(state, action: PayloadAction<{ id: string; updatedTask: Partial<Task> }>) {
      const { id, updatedTask } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex >= 0) {
        // Edita a tarefa existente
        state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updatedTask };
        localStorage.setItem("tasks", JSON.stringify(state.tasks)); // Atualiza o localStorage
      }
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload); // Remove a tarefa pelo id
      localStorage.setItem("tasks", JSON.stringify(state.tasks)); // Atualiza o localStorage
    },
  },
});

export const {
  setTasks,
  setSelectedDay,
  setSelectedCategory,
  setSearchQuery,
  addTask,
  editTask,
  deleteTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
