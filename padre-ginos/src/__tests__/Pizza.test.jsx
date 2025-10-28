import { cleanup, render } from "@testing-library/react";
import { test, expect, afterEach } from "vitest";
import Pizza from "../Pizza";

// to cleanup the testing lib after each test
// To prevent state contamination between tests “which could affect other tests”
afterEach(cleanup);

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

// here is an example of TTD : we are writing our test which will fail as our Pizza component
// don't have default value for image till now.
// so we write our tests first and then make it work.
test("img should have default value", async () => {
  const screen = render(
    <Pizza
      name="MyFav Pizza"
      description="Description for my favorite pizza"
    />,
  );

  const img = screen.getByRole("img");
  expect(img.src).not.toBe("");
});
