export async function getPastOrder(orderId) {
  await new Promise((res) => setTimeout(res, 5000));
  const res = await fetch(`/api/past-order/${orderId}`);
  const data = await res.json();
  return data;
}
