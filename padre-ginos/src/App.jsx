import { createRoot } from "react-dom/client";
import Order from "./Order";
import PizzaOfTheDay from "./PizzaOfTheDay";

const App = () => {
  return (
    <div>
      <h1 className="logo">Padre Gino's Pizza</h1>
      <Order />
      <PizzaOfTheDay />
    </div>
  );
};

const AppContainer = document.getElementById("root");
const AppRoot = createRoot(AppContainer);
AppRoot.render(<App />);
