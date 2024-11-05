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
              <p 
                class="max-w-36 sm:max-w-full truncate" 
                title="${description}"
              >
                ${description}
              </p>
              <p>Category: ${category}</p>
          </div>
  
          <div class="flex flex-col justify-between">
              <input id="checkbox" type="checkbox" value="" class="size-[14px] bg-transparent border-gray-300 focus:ring-black focus:ring-1 rounded-none">
              <img src="/icons/square-pen.svg" class="size-4"/>
              <img src="/icons/trash-2.svg" class="size-4"/>
          </div>
      </div>
      `;
  }
}
