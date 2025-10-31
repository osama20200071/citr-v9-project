import { expect, test, vi } from "vitest";
import { Route } from "../routes/contact.lazy";
import { render } from "@testing-library/react";

// we need it as the component we are testing uses react query
// so we need to wrap it with during the testing
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import createFetchMock from "vitest-fetch-mock";

const queryClient = new QueryClient();

// vi => the name of the spy lib in vitest, to spy on our requests
// so we are faking our fetch and let vi spying on it

// now mocking our fetch and spying on it
const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

test("can submit contact form", async () => {
  // tell the mocker to respond with this if gets called
  fetchMocker.mockResponse(
    JSON.stringify({
      status: "ok",
    }),
  );

  const screen = render(
    <QueryClientProvider client={queryClient}>
      {/* as we need to test the actual component of this route */}
      <Route.options.component />
    </QueryClientProvider>,
  );

  // simulating input events
  const nameInput = screen.getByPlaceholderText("Name");
  const emailInput = screen.getByPlaceholderText("Email");
  const msgTextArea = screen.getByPlaceholderText("Message");

  const userData = {
    name: "Tester",
    email: "tester@gmail.com",
    message: "Welcome back",
  };

  // putting our test data
  nameInput.value = userData.name;
  emailInput.value = userData.email;
  msgTextArea.value = userData.message;

  const btn = screen.getByRole("button");
  btn.click();

  // just notice the difference between getByRole and findByRole => sync and async methods
  // getByRole => for getting immediately
  // findByRole => waiting a bit for getting it
  const h3 = await screen.findByRole("heading", { level: 3 });
  expect(h3.innerText).toContain("Submitted");

  // testing the api, did they call the api with the right data ? and to the right endpoint ?
  const requests = fetchMocker.requests();

  // make sure the api was called only once
  expect(requests.length).toBe(1);

  // make sure it called the right api endpoint
  expect(requests[0].url).toBe("/api/contact");

  // make sure it was called with the right data
  expect(fetchMocker).toHaveBeenCalledWith("/api/contact", {
    body: JSON.stringify(userData),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
});
