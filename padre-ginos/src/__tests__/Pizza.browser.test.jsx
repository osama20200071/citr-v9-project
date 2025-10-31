import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import Pizza from "../Pizza";

test("alt text renders on img", async () => {
  const name = "My Favorite Pizza";
  const src = "https://picsum.photos/200";

  const screen = render(
    <Pizza name={name} description="description of the image" image={src} />,
  );

  const img = await screen.getByRole("img");

  // in the browser-based env we do async checks "it goes to the browser to get the element"
  // in dom based env it's just synchronous checks "it's just like reading text out of document"
  await expect.element(img).toBeInTheDocument();
  await expect.element(img).toHaveAttribute("src", src);
  await expect.element(img).toHaveAttribute("alt", name);
});
