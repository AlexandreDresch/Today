import { ComponentProps } from "../../types";

export class Component {
  props: ComponentProps;
  element: DocumentFragment;

  constructor(props: ComponentProps = {}) {
    this.props = props;
    this.element = document.createDocumentFragment();
  }

  render(): string {
    return "";
  }

  mount(target: HTMLElement): void {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = this.render();
    while (tempDiv.firstChild) {
      this.element.appendChild(tempDiv.firstChild);
    }
    target.appendChild(this.element);
  }
}
