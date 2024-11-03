import { Header } from "./components/header";
import { MainSection } from "./components/main-section";
import { baseTasks } from "./constants";

const app = document.getElementById("app") as HTMLElement;

const headerComponent = new Header();
const mainSectionComponent = new MainSection({ tasks: baseTasks });

headerComponent.mount(app);
mainSectionComponent.mount(app);
