import { Component } from "./shared/component.ts";

export class Header extends Component {
  render(): string {
    return /*html*/ `
      <header class="fixed w-full top-0 left-0 flex items-center justify-between bg-white border border-gray-300 h-16">
        <nav aria-label="Main navigation" class="pl-10">
          <a href="/" class="font-orbitron font-bold text-xl antialiased"  aria-label="Today - Home">
            Today
          </a>
        </nav>
      </header>
    `;
  }
}
