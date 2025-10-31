import { test, expect } from "vitest";
import { Route } from "../routes/Order";
import { render } from "@testing-library/react";

test.todo("selected pizza is added to our cart", async () => {
  const screen = render(<Route.options.component />);

  // making sure the selected pizza is rendered within Pizza component

  const selectedPizzaType = screen.getByRole("cell", { name: "pizza-type" });
  const selectedPizzaSize = screen.getByRole("checkbox", {
    name: "pizza-size",
  });

  const shownPizzaName = screen.getByRole("heading", { level: 1 });
  expect(shownPizzaName.innerText).toBe(selectedPizzaType);

  // get selected pizza type , size make sure it's added to our cart.
});
