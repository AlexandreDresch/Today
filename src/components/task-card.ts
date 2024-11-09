import { Task } from "../types/index";
import { Component } from "./shared/component.ts";
import store from "../store/store";
import { toggleTask } from "../store/task-slice.ts";

export class TaskCard extends Component {
  constructor(props: Task) {
    super(props);
    this.element = document.createElement("li");
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  private handleCheckboxChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const taskId = checkbox.dataset.taskId;

    if (taskId) {
      store.dispatch(toggleTask(taskId));
    }
  }

  render(): string {
    const { id, title, description, category, completed } = this.props as Task;

    return /*html*/ `
      <div class="flex justify-between p-2 bg-white border border-black shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]" data-task-id="${id}">
          <div class="flex flex-col space-y-3">
              <h3>${title}</h3>
              <p class="max-w-36 sm:max-w-full truncate" title="${description}">
                ${description}
              </p>
              <p class="border px-2 border-slate-300 text-center">${category}</p>
          </div>
  
          <div class="flex flex-col justify-between">
              <input type="checkbox" id="checkbox-${id}" data-task-id="${id}" ${
      completed ? "checked" : ""
    } class="task-checkbox size-[14px] bg-transparent border-gray-300 focus:ring-black focus:ring-1 rounded-none">
              <img src="/icons/square-pen.svg" class="size-4"/>
              <img src="/icons/trash-2.svg" class="size-4"/>
          </div>
      </div>
    `;
  }

  mount(target: HTMLElement): void {
    super.mount(target);

    setTimeout(() => {
      const checkbox = this.element.querySelector(
        `#checkbox-${this.props.id}`
      ) as HTMLInputElement;
      if (checkbox) {
        checkbox.addEventListener("change", this.handleCheckboxChange);
      }
    }, 0);
  }
}
