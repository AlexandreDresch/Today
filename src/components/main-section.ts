import { Task } from "../types";
import { Component } from "./shared/component";
import { AddTaskModal } from "./add-task-modal";
import { TaskCard } from "./task-card";
import store from "../store/store";
import AirDatepicker from "air-datepicker";
import localeEn from "air-datepicker/locale/en";
import "air-datepicker/air-datepicker.css";
import { formatDate } from "../utils/utils";

export class MainSection extends Component {
  private selectedDay: string;
  private selectedCategory: string | null;
  private searchQuery: string;
  private tempSearchQuery: string;
  private currentTasks: Task[];
  element: HTMLElement;

  constructor() {
    super();
    this.selectedDay = store.getState().tasks.selectedDay;
    this.selectedCategory = store.getState().tasks.selectedCategory;
    this.searchQuery = store.getState().tasks.searchQuery;
    this.tempSearchQuery = "";

    this.currentTasks = this.getTasksForDay(this.selectedDay);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);

    store.subscribe(() => {
      const state = store.getState();
      this.selectedDay = state.tasks.selectedDay;
      this.selectedCategory = state.tasks.selectedCategory;
      this.searchQuery = state.tasks.searchQuery;

      this.currentTasks = this.getTasksForDay(this.selectedDay);
      this.update();
    });

    this.element = document.createElement("main");
    this.element.classList.add("main-section");

    this.render();
    this.addEventListeners();
  }

  private getTasksForDay(day: string): Task[] {
    const tasks = store.getState().tasks.tasks;

    const dayTasks = tasks.filter((task: Task) => {
      return task.date === day;
    });

    return dayTasks;
  }

  private handleDayChange(event: Event): void {
    const selectedDay = (event.target as HTMLSelectElement).value;
    this.selectedDay = selectedDay;
    this.currentTasks = this.getTasksForDay(selectedDay);
    this.update();
  }

  private handleCategoryChange(event: Event): void {
    const selectedCategory = (event.target as HTMLSelectElement).value;
    this.selectedCategory =
      selectedCategory === "All" ? null : selectedCategory;
    this.update();
  }

  private handleSearch(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      event.preventDefault();
      this.searchQuery = this.tempSearchQuery;
      this.update();
    }
  }

  private clearSearch(): void {
    this.tempSearchQuery = "";
    this.searchQuery = "";
    this.update();
  }

  private update(): void {
    this.element.innerHTML = this.render();
    this.addEventListeners();
  }

  private addEventListeners(): void {
    setTimeout(() => {
      const datepickerInput = this.element.querySelector(
        "#datepicker-input"
      ) as HTMLInputElement;
      if (datepickerInput) {
        new AirDatepicker(datepickerInput, {
          autoClose: true,
          locale: localeEn,
          dateFormat: "yyyy-MM-dd",
          onSelect: ({ formattedDate }) => {
            if (Array.isArray(formattedDate)) {
              this.selectedDay = formattedDate[0];
            } else {
              this.selectedDay = formattedDate;
            }
            this.currentTasks = this.getTasksForDay(this.selectedDay);
            this.update();
          },
        });
      }

      const categorySelect = this.element.querySelector(
        "#underline_category"
      ) as HTMLSelectElement;
      const searchInput = this.element.querySelector(
        "#simple-search"
      ) as HTMLInputElement;
      const clearButton = this.element.querySelector(
        "#clear-search"
      ) as HTMLButtonElement;
      const addButton = this.element.querySelector(
        "#addButton"
      ) as HTMLButtonElement;

      if (categorySelect) {
        categorySelect.addEventListener("change", this.handleCategoryChange);
      }
      if (searchInput) {
        searchInput.value = this.tempSearchQuery;
        searchInput.addEventListener("keydown", this.handleSearch);
        searchInput.addEventListener("input", (event) => {
          this.tempSearchQuery = (event.target as HTMLInputElement).value;
        });
      }
      if (clearButton) {
        clearButton.addEventListener("click", this.clearSearch);
      }
      if (addButton) {
        addButton.addEventListener("click", (event) => {
          event.preventDefault();
          this.handleAddButtonClick();
        });
      }
    }, 0);
  }

  private getFilteredTasks(): Task[] {
    return this.currentTasks
      .filter((task) => {
        return (
          !this.selectedCategory || task.category === this.selectedCategory
        );
      })
      .filter((task) => {
        return (
          !this.searchQuery ||
          task.title.toLowerCase().includes(this.searchQuery)
        );
      });
  }

  private handleAddButtonClick(): void {
    const modal = new AddTaskModal();

    modal.mount(document.body);
  }

  render(): string {
    const filteredTasks = this.getFilteredTasks();
    const uniqueCategories = [
      "All",
      ...new Set(this.currentTasks.map((task) => task.category)),
    ];
  
    const extendedDay = formatDate(this.selectedDay);
  
    const html = /*html*/ `
      <section class="bg-main-pattern bg-no-repeat bg-cover h-screen flex items-center justify-center p-10">
        <div class="bg-white border-4 border-black p-4 w-full max-w-3xl">
          <div class="flex flex-col gap-2">
            <div class="flex justify-between items-baseline">
              <h3 class="font-archivo font-medium">${extendedDay}</h3>
              <button id="addButton" class="font-archivo text-gray-500 font-light tracking-widest">Add</button>
            </div>
            <form class="flex flex-col gap-2" onsubmit="return false;">
              <div class="flex gap-2">
                <label for="underline_category" class="sr-only">By category</label>
                <select id="underline_category" class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                  ${uniqueCategories
                    .map(
                      (category) => /*html*/ `
                        <option value="${category}" ${
                          category === this.selectedCategory ? "selected" : ""
                        }>
                          ${category}
                        </option>
                      `
                    )
                    .join("")}
                </select>
                <label for="datepicker-input" class="sr-only">Select a Day</label>
                <input 
                  type="text" 
                  id="datepicker-input" 
                  placeholder="Select a Day"
                  autocomplete="off"
                  class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                />
              </div>
              <label for="simple-search" class="sr-only">Search by name</label>
              <div class="relative w-full">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <img src="/icons/search.svg"/>
                </div>
                <input 
                  type="text" 
                  id="simple-search" 
                  class="border border-gray-300 text-sm block w-full ps-10 p-2.5" 
                  placeholder="Search by name" 
                  value="${this.tempSearchQuery}" />
                ${
                  this.tempSearchQuery
                    ? /*html*/ `
                    <button id="clear-search" type="button" class="absolute inset-y-0 end-0 pe-3 flex items-center">
                      <img src="/icons/x.svg"/>
                    </button>`
                    : ""
                }
              </div>
            </form>
          </div>
          <ul class="mt-2 p-px h-96 overflow-y-scroll space-y-2 tasks-container">
            ${
              filteredTasks.length === 0
                ? /*html*/ `<p class="text-center text-gray-500">No tasks found.</p>`
                : ""  
            }
          </ul>
        </div>
      </section>
    `;
  
    setTimeout(() => {
      const tasksContainer = this.element.querySelector(".tasks-container") as HTMLElement;
      if (tasksContainer && filteredTasks.length > 0) {
        tasksContainer.innerHTML = "";
        filteredTasks.forEach((task) => {
          const taskCard = new TaskCard(task);
          taskCard.mount(tasksContainer);
        });
      }
    }, 0);
  
    return html;
  }
  
}
