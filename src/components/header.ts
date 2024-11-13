import { Component } from "./shared/component.ts";

export class Header extends Component {
  render(): string {
    return /*html*/ `
      <header class="fixed w-full top-0 left-0 flex items-center justify-between bg-white border border-gray-300 h-16" role="banner">
        <nav aria-label="Main navigation" class="pl-4 md:pl-10">
          <a href="/" class="font-orbitron font-bold text-xl antialiased" 
            aria-label="Navigate to Today - Home" 
            title="Go to Today's view" 
            tabindex="0">
            Today
          </a>
        </nav>
      </header>
    `;
  }
}
