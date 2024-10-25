import { Component } from "./shared/component.ts";

export class Header extends Component {
  render(): string {
    return /*html*/ `
      <header class="flex items-center justify-between bg-white border border-gray-300 h-16">
        <nav aria-label="Main navigation" class="pl-10">
          <a href="/" class="font-orbitron font-bold text-xl antialiased"  aria-label="Today - Home">
            Today
          </a>
        </nav>
      </header>
    `;
  }
}
