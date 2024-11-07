import { Task } from "../types/index";
import { Component } from "./shared/component.ts";

export class TaskCard extends Component {
  constructor(props: Task) {
    super(props);
  }

  render(): string {
    const { id, title, description, category, completed } = this.props as Task;

    return /*html*/ `
      <div class="flex justify-between p-2 bg-white border border-black shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]" key="${id}">
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
              <input id="checkbox" type="checkbox" value="${completed}" class="size-[14px] bg-transparent border-gray-300 focus:ring-black focus:ring-1 rounded-none">
              <img src="/icons/square-pen.svg" class="size-4"/>
              <img src="/icons/trash-2.svg" class="size-4"/>
          </div>
      </div>
      `;
  }
}
