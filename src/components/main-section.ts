import { Component } from "./shared/component";

export class MainSection extends Component {
  render(): string {
    return /*html*/ `
      <main class="bg-main-pattern bg-no-repeat bg-cover h-screen flex items-center justify-center p-10">
        <div class="bg-white border-4 border-black p-4 w-full">
            <div class="flex flex-col gap-2">
                <div class="flex justify-between items-baseline">
                    <h3 class="font-archivo font-medium">Sunday</h3>

                    <button class="font-archivo text-gray-500 font-light tracking-widest">Add</button>
                </div>

                <form class="flex flex-col gap-2">
                    <div class="flex gap-2">
                        <label for="underline_category" class="sr-only">By category</label>
                        <select id="underline_category" class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                            <option selected>By category</option>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                        </select>

                        <label for="underline_priority" class="sr-only">By priority</label>
                        <select id="underline_priority" class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                            <option selected>By priority</option>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                        </select>
                    </div>

                    <label for="simple-search" class="sr-only">Search by name</label>
                    <div class="relative w-full">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <img src="/icons/search.svg"/>
                        </div>
                        <input type="text" id="simple-search" class="border border-gray-300 text-sm block w-full ps-10 p-2.5" placeholder="Search by name" />
                    </div>
                </form>
            </div>

            <div class="mt-2">
                <div class="flex justify-between p-2 bg-gray-100 ">
                    <div>
                        <h2>Learn Javascript</h2>
                        <p>Today, we will learn Javascript basics.</p>
                        <p>Start date: 10-24-2024</p>
                    </div>

                    <div class="flex flex-col justify-between">
                        <img src="/icons/circle-check-big.svg"/>
                        <img src="/icons/square-pen.svg"/>
                        <img src="/icons/trash-2.svg"/>
                    </div>
                </div>
            </div>
        </div>
      </main>
    `;
  }
}
