import { Header } from "./components/header";
import { MainSection } from "./components/main-section";

const app = document.getElementById("app") as HTMLElement;

const headerComponent = new Header();
const mainSectionComponent = new MainSection();

headerComponent.mount(app);
mainSectionComponent.mount(app);
