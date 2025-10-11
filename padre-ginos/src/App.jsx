import Pizza from "./Pizza";
import { createRoot } from "react-dom/client";

const App = () => {
  return (
    <div>
      <h1>Main Header</h1>
      <Pizza title="Chess" desc="Chess pizza desc" />
    </div>
  );
};

const AppContainer = document.getElementById("root");
const AppRoot = createRoot(AppContainer);
AppRoot.render(<App />);
