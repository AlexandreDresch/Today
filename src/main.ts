import { Header } from "./components/header";

const app = document.getElementById("app") as HTMLElement;

const headerComponent = new Header();

headerComponent.mount(app);
