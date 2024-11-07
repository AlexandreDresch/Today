import { Component } from "./shared/component";
import store from "../store/store";
import { addTask } from "../store/task-slice";

export class AddTaskModal extends Component {
  constructor() {
    super();

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
    event.preventDefault(); // Prevent default form submission

    const title = (this.element.querySelector("#taskTitle") as HTMLInputElement)
      .value;
    const description = (
      this.element.querySelector("#taskDescription") as HTMLTextAreaElement
    ).value;
    const category = (
      this.element.querySelector("#taskCategory") as HTMLSelectElement
    ).value;

    const today = Date.now().toString();

    const newTask = {
      id: today,
      title,
      description,
      date: today,
      completed: false,
      category,
    };

    store.dispatch(addTask(newTask));

    const form = this.element.querySelector("#taskForm") as HTMLFormElement;
    form.reset();
  }

  render(): string {
    return /*html*/ `
      <div class="bg-white border-4 border-black p-4 w-full sm:min-w-[400px]">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold font-archivo">Add New Task</h2>
          <button id="closeModal">
            <img src="/icons/x.svg" class="size-5" />
          </button>
        </div>
        <div class="content mb-4">
          <form id="taskForm" class="space-y-2">
              <div class="">
                <label for="taskTitle" class="block text-sm font-medium text-gray-700">Title</label>
                <input type="text" id="taskTitle" name="taskTitle" class="mt-1 block w-full border border-gray-300 rounded p-2" required />
              </div>

              <div class="">
                <label for="taskDescription" class="block text-sm font-medium text-gray-700">Description</label>
                <textarea id="taskDescription" name="taskDescription" rows="4" class="mt-1 block w-full border border-gray-300 rounded p-2"></textarea>
              </div>

              <div class="">
                <label for="taskCategory" class="block text-sm font-medium text-gray-700">Category</label>
                <select id="taskCategory" name="taskCategory" class="mt-1 block w-full border border-gray-300 rounded p-2">
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Hobby">Hobby</option>
                </select>
              </div>

              <button 
              type="submit" 
              class="w-full bg-white text-black py-2 font-archivo font-semibold tracking-widest border-2 border-b-4 border-l-4 border-black hover:border-t-4 hover:border-b-2">
              Add Task
            </button>
          </form>
        </div>
      </div>
    `;
  }

  mount(target: HTMLElement): void {
    super.mount(target);
    (this.element as HTMLDialogElement).showModal();

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
