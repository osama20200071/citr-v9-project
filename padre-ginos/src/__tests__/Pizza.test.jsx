import { render } from "@testing-library/react";
import { test, expect } from "vitest";
import Pizza from "../Pizza";

test("alt text renders on image", async () => {
  const name = "My Pizza";
  const src = "https://picsum.photos/200";

  const screen = render(
    <Pizza
      name={name}
      description={"Description for my favorite pizza"}
      image={src}
    />,
  );

  // these methods focuses on what the users sees not by focusing on
  // get me the thing with id = "main-img" for
  // but get me the thing that seems to be an image for the user
  // this is how those role thing is.
  const img = screen.getByRole("img");
  expect(img.alt).toBe(name);
  expect(img.src).toBe(src);
});
