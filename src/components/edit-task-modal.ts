import { Component } from "./shared/component";

import store from "../store/store";
import { editTask } from "../store/task-slice";

import AirDatepicker from "air-datepicker";
import localeEn from "air-datepicker/locale/en";
import "air-datepicker/air-datepicker.css";

import { Task } from "../types";

export class EditTaskModal extends Component {
  private selectedDay: string;
  constructor(props: Task) {
    super(props);
    this.selectedDay = this.props.date || "";
    this.element = document.createElement("dialog");
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  private handleClose(): void {
    if (this.props.onClose) {
      this.props.onClose();
    }
    if (this.element instanceof HTMLDialogElement) {
      this.element.close();
      this.element.remove();
    }
  }

  private handleSubmit(event: Event): void {
    event.preventDefault();

    const title = (this.element.querySelector("#taskTitle") as HTMLInputElement)
      .value;
    const description = (
      this.element.querySelector("#taskDescription") as HTMLTextAreaElement
    ).value;
    const category = (
      this.element.querySelector("#taskCategory") as HTMLInputElement
    ).value;

    const updatedTask = {
      ...this.props,
      title,
      description,
      date: this.selectedDay,
      category,
    };

    store.dispatch(editTask({ id: this.props.id, updatedTask }));

    const form = this.element.querySelector("#taskForm") as HTMLFormElement;
    form.reset();
    this.handleClose();
  }

  render(): string {
    const { title = "", description = "", category = "" } = this.props;

    return /*html*/ `
      <div class="bg-white border-4 border-black p-4 w-full sm:min-w-[400px] z-0" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <div class="flex justify-between items-center mb-4">
          <h2 id="modalTitle" class="text-lg font-semibold font-archivo">Edit Task</h2>
          <button id="closeModal" aria-label="Close Edit Task Modal">
            <img src="/icons/x.svg" class="size-5" alt="Close icon" />
          </button>
        </div>
        <div class="content mb-4" id="modalDescription">
          <form id="taskForm" class="space-y-2">
              <div>
                <label for="taskTitle" class="block text-sm font-medium text-gray-700">Title</label>
                <input type="text" id="taskTitle" name="taskTitle" value="${title}" class="mt-1 block w-full border border-gray-300 p-2" required aria-describedby="taskTitleHelp"/>
              </div>

              <div>
                <label for="taskDescription" class="block text-sm font-medium text-gray-700">Description</label>
                <textarea id="taskDescription" name="taskDescription" rows="4" class="mt-1 block w-full border border-gray-300 p-2" required aria-describedby="taskDescriptionHelp">${description}</textarea>
              </div>

              <div>
                <label for="datepicker-input" class="block text-sm font-medium text-gray-700">Select a Day</label>
                <input 
                  type="text" 
                  id="datepicker-input" 
                  value="${this.selectedDay}" 
                  class="block mt-1 w-full border border-gray-300 p-2 text-sm text-gray-500 bg-transparent appearance-none peer" 
                  required aria-describedby="datepickerHelp"
                />
                <span id="datepickerHelp" class="sr-only">Select a date from the date picker</span>
              </div>

              <div id="datepicker-container"></div>

              <div>
                <label for="taskCategory" class="block text-sm font-medium text-gray-700">Category</label>
                <input 
                  type="text" 
                  id="taskCategory"
                  value="${category}"
                  required
                  class="block mt-1 w-full border border-gray-300 p-2 text-sm text-gray-500 bg-transparent appearance-none peer"
                  aria-describedby="taskCategoryHelp"
                />
                <span id="taskCategoryHelp" class="sr-only">Enter the task category</span>
              </div>

              <button 
                type="submit" 
                class="w-full bg-white text-black py-2 font-archivo font-semibold tracking-widest border-2 border-b-4 border-l-4 border-black hover:border-t-4 hover:border-b-2"
                aria-label="Save changes"
              >
                Save Changes
              </button>
          </form>
        </div>
      </div>
    `;
  }

  mount(target: HTMLElement): void {
    super.mount(target);
    (this.element as HTMLDialogElement).showModal();

    const datepickerInput = this.element.querySelector(
      "#datepicker-input"
    ) as HTMLInputElement;

    const datepickerContainer = this.element.querySelector(
      "#datepicker-container"
    );

    new AirDatepicker(datepickerInput, {
      autoClose: true,
      locale: localeEn,
      position: "top",
      dateFormat: "yyyy-MM-dd",
      container: datepickerContainer as HTMLElement,
      onSelect: ({ formattedDate }) => {
        this.selectedDay = Array.isArray(formattedDate)
          ? formattedDate[0]
          : formattedDate;
      },
    });

    const closeButton = this.element.querySelector("#closeModal");
    if (closeButton) {
      closeButton.addEventListener("click", this.handleClose);
    }

    this.element.addEventListener("click", (event) => {
      if (event.target === this.element) {
        this.handleClose();
      }
    });

    const form = this.element.querySelector("#taskForm") as HTMLFormElement;
    if (form) {
      form.addEventListener("submit", (event) => {
        this.handleSubmit(event);
      });
    }
  }
}
