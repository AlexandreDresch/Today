import { daysOfWeek } from "../constants";
import { DailyTasks, MainSectionProps, Task } from "../types";
import { Component } from "./shared/component";
import { TaskCard } from "./task-card";

export class MainSection extends Component {
  private selectedDay: string;
  private selectedCategory: string | null;
  private searchQuery: string;
  private tempSearchQuery: string;
  private currentTasks: Task[];
  element: HTMLElement;

  constructor(props: MainSectionProps) {
    super(props);
    this.selectedDay = this.getCurrentDay();
    this.selectedCategory = null;
    this.searchQuery = "";
    this.tempSearchQuery = "";
    this.currentTasks = this.getTasksForDay(this.selectedDay);

    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);

    this.element = document.createElement("main");
    this.element.classList.add("main-section");

    this.render();
    this.addEventListeners();
  }

  private getCurrentDay(): string {
    const today = new Date();
    return daysOfWeek[today.getDay()];
  }

  private getTasksForDay(day: string): Task[] {
    const dayTasks = this.props.tasks.find(
      (dayItem: DailyTasks) => dayItem.day === day
    );
    return dayTasks ? dayTasks.tasks : [];
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
      const daySelect = this.element.querySelector(
        "#underline_day"
      ) as HTMLSelectElement;
      const categorySelect = this.element.querySelector(
        "#underline_category"
      ) as HTMLSelectElement;
      const searchInput = this.element.querySelector(
        "#simple-search"
      ) as HTMLInputElement;
      const clearButton = this.element.querySelector(
        "#clear-search"
      ) as HTMLButtonElement;

      if (daySelect) {
        daySelect.addEventListener("change", this.handleDayChange);
      }
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

  render(): string {
    const filteredTasks = this.getFilteredTasks();
    const uniqueCategories = [
      "All",
      ...new Set(this.currentTasks.map((task) => task.category)),
    ];

    return /*html*/ `
      <section class="bg-main-pattern bg-no-repeat bg-cover h-screen flex items-center justify-center p-10">
        <div class="bg-white border-4 border-black p-4 w-full">
          <div class="flex flex-col gap-2">
            <div class="flex justify-between items-baseline">
              <h3 class="font-archivo font-medium">${this.selectedDay}</h3>
              <button class="font-archivo text-gray-500 font-light tracking-widest">Add</button>
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
                <label for="underline_day" class="sr-only">By Day</label>
                <select id="underline_day" class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                  ${daysOfWeek
                    .map(
                      (day) => /*html*/ `
                    <option value="${day}" ${
                        day === this.selectedDay ? "selected" : ""
                      }>
                      ${day}
                    </option>
                  `
                    )
                    .join("")}
                </select>
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
          <div class="mt-2 h-96 overflow-y-scroll space-y-2">
          ${
            filteredTasks.length === 0
              ? /*html*/ `<p class="text-center text-gray-500">No tasks found.</p>`
              : filteredTasks
                  .map((task) => {
                    const taskCard = new TaskCard(task);
                    return taskCard.render();
                  })
                  .join("")
          }
          </div>
        </div>
      </section>
    `;
  }
}
