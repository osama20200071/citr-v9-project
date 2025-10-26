export async function postContact(name, email, message) {
  const response = await fetch("/api/contact", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      message,
    }),
  });

  if (!response.ok) {
    throw new Error(
      "Error happened while sending your message, try again later.",
    );
  }

  // we don't need to await here as this is an async function already that returns a promise
  // return await response.json();
  return response.json();
}
