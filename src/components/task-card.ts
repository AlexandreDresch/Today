import { Task } from "../types/index";
import { Component } from "./shared/component.ts";

export class TaskCard extends Component {
  constructor(props: Task) {
    super(props);
  }

  render(): string {
    const { title, description, category } = this.props as Task;

    return /*html*/ `
      <div class="flex justify-between p-2 bg-gray-100">
          <div class="flex flex-col space-y-3">
              <h3>${title}</h3>
              <p>${description}</p>
              <p>Category: ${category}</p>
          </div>
  
          <div class="flex flex-col justify-between">
              <img src="/icons/circle-check-big.svg"/>
              <img src="/icons/square-pen.svg"/>
              <img src="/icons/trash-2.svg"/>
          </div>
      </div>
      `;
  }
}
