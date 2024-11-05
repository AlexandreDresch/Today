import { Component } from "./component";
interface ButtonProps {
  label: string;
  onClick?: () => void;
}

export class Button extends Component {
  constructor(props: ButtonProps) {
    super(props);
    this.element = document.createElement("button");
    this.handleClick = this.handleClick.bind(this);
  }

  private handleClick(): void {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  render(): string {
    const { label } = this.props;

    return /*html*/ `
      <button 
        class="w-full bg-white text-black py-2 font-archivo font-semibold tracking-widest border-2 border-b-4 border-l-4 border-black hover:border-t-4 hover:border-b-2">
        ${label}
      </button>
    `;
  }

  mount(target: HTMLElement): void {
    super.mount(target);

    const buttonElement = this.element.querySelector("button");
    if (buttonElement) {
      buttonElement.addEventListener("click", this.handleClick);
    }
  }
}
