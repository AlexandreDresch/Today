import { daysOfWeek } from "../constants";
import { DailyTasks, MainSectionProps, Task } from "../types";
import { Component } from "./shared/component";

export class MainSection extends Component {
  private selectedDay: string;
  private currentTasks: Task[];
  element: HTMLElement;

  constructor(props: MainSectionProps) {
    super(props);
    this.selectedDay = this.getCurrentDay();
    this.currentTasks = this.getTasksForDay(this.selectedDay);
    this.handleDayChange = this.handleDayChange.bind(this);

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

  private update(): void {
    this.element.innerHTML = this.render();

    this.addEventListeners();
  }

  private addEventListeners(): void {
    setTimeout(() => {
      const daySelect = this.element.querySelector(
        "#underline_day"
      ) as HTMLSelectElement;
      if (daySelect) {
        daySelect.addEventListener("change", this.handleDayChange);
      }
    }, 0);
  }

  render(): string {
    return /*html*/ `
      <section class="bg-main-pattern bg-no-repeat bg-cover h-screen flex items-center justify-center p-10">
        <div class="bg-white border-4 border-black p-4 w-full">
          <div class="flex flex-col gap-2">
            <div class="flex justify-between items-baseline">
              <h3 class="font-archivo font-medium">${this.selectedDay}</h3>
              <button class="font-archivo text-gray-500 font-light tracking-widest">Add</button>
            </div>
            <form class="flex flex-col gap-2">
              <div class="flex gap-2">
                <label for="underline_category" class="sr-only">By category</label>
                <select id="underline_category" class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                  ${this.currentTasks
                    .map(
                      (task) => /*html*/ `
                    <option value="${task.category}">${task.category}</option>
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
                <input type="text" id="simple-search" class="border border-gray-300 text-sm block w-full ps-10 p-2.5" placeholder="Search by name" />
              </div>
            </form>
          </div>
          <div class="mt-2 h-96 overflow-y-scroll space-y-2">
          ${
            this.currentTasks.length === 0
              ? /*html*/ `<p class="text-center text-gray-500">No tasks found.</p>`
              : this.currentTasks
                  .map(
                    (task) => /*html*/ `
                  <div class="flex justify-between p-2 bg-gray-100">
                    <div class="flex flex-col space-y-3">
                      <h3>${task.title}</h3>
                      <p>${task.description}</p>
                      <p>Category: ${task.category}</p>
                    </div>
                    <div class="flex flex-col justify-between">
                      <img src="/icons/circle-check-big.svg"/>
                      <img src="/icons/square-pen.svg"/>
                      <img src="/icons/trash-2.svg"/>
                    </div>
                  </div>
                `
                  )
                  .join("")
          }
          </div>
        </div>
      </section>
    `;
  }
}
