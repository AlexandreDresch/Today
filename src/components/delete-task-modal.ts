import { Component } from "./shared/component";

import store from "../store/store";
import { deleteTask } from "../store/task-slice";

import { Task } from "../types";

export class DeleteTaskModal extends Component {
  constructor(props: Task) {
    super(props);
    this.element = document.createElement("dialog");
    this.handleClose = this.handleClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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

  private handleDelete(): void {
    store.dispatch(deleteTask(this.props.id));
    this.handleClose();
  }

  render(): string {
    const { title } = this.props;

    return /*html*/ `
      <div class="bg-white border-4 border-black p-4 w-full sm:min-w-[300px] z-0">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold font-archivo" id="modalTitle">Delete Task</h2>
          <button id="closeModal" aria-label="Close modal">
            <img src="/icons/x.svg" class="size-5" alt="Close"/>
          </button>
        </div>
        <div>
          <p id="modalDescription">Are you sure you want to delete the task <strong>"${title}"</strong>?</p>
          <div class="flex justify-end space-x-2 mt-4">
            <button 
              id="cancelButton" 
              class="px-4 py-2 border border-gray-300 bg-white hover:bg-gray-100"
              aria-label="Cancel task deletion"
            >
              Cancel
            </button>
            <button 
              id="confirmButton" 
              class="px-4 py-2 border border-red-600 bg-red-600 text-white hover:bg-red-700"
              aria-label="Confirm task deletion"
            >
              Delete
            </button>
          </div>
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

    const cancelButton = this.element.querySelector("#cancelButton");
    if (cancelButton) {
      cancelButton.addEventListener("click", this.handleClose);
    }

    const confirmButton = this.element.querySelector("#confirmButton");
    if (confirmButton) {
      confirmButton.addEventListener("click", this.handleDelete);
    }

    this.element.addEventListener("click", (event) => {
      if (event.target === this.element) {
        this.handleClose();
      }
    });
  }
}
