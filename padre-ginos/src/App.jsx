import { createRoot } from "react-dom/client";
import Order from "./Order";

const App = () => {
  return (
    <div>
      <h1 className="logo">Padre Gino's Pizza</h1>
      <Order />
    </div>
  );
};

const AppContainer = document.getElementById("root");
const AppRoot = createRoot(AppContainer);
AppRoot.render(<App />);
