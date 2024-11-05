import { Component } from "./component";
import { Button } from "./button";

interface ModalProps {
  title?: string;
  content?: string;
  onClose?: () => void;
  buttonLabel?: string;
}

export class Modal extends Component {
  constructor(props: ModalProps) {
    super(props);

    this.element = document.createElement("dialog");
    this.handleClose = this.handleClose.bind(this);
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

  render(): string {
    const {
      title = "Modal Title",
      content = "Modal Content",
      buttonLabel = "Confirm",
    } = this.props;

    const confirmButton = new Button({
      label: buttonLabel,
      onClick: () => {
        console.log("Confirm button clicked");
        this.handleClose();
      },
    }).render();

    return /*html*/ `
      <div class="bg-white border-4 border-black p-4 w-full sm:min-w-[400px]">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold font-archivo">${title}</h2>
          <button id="closeModal">
            <img src="/icons/x.svg" class="size-5" />
          </button>
        </div>
        <div class="content mb-4">${content}</div>
        ${confirmButton}
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
  }
}
