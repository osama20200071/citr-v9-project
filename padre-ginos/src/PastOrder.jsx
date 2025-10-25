import { formatPrice } from "./utils";

function PastOrder({ isLoading, data, setFocusedOrder }) {
  return (
    <>
      <h2>Order #{data?.order.order_id}</h2>
      <table>
        <thead>
          <tr>
            <td>Image</td>
            <td>Name</td>
            <td>Size</td>
            <td>Quantity</td>
            <td>Price</td>
            <td>Total</td>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <PastOrderFallback />
          ) : (
            data.orderItems.map((pizza) => (
              <tr key={`${pizza.pizzaTypeId}_${pizza.size}`}>
                <td>
                  <img src={pizza.image} alt={pizza.name} />
                </td>
                <td>{pizza.name}</td>
                <td>{pizza.size}</td>
                <td>{pizza.quantity}</td>
                <td>{formatPrice(pizza.price)}</td>
                <td>{formatPrice(pizza.total)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <button onClick={() => setFocusedOrder()}>Close</button>
    </>
  );
}

export default PastOrder;

function PastOrderFallback() {
  return (
    <tr>
      <td>
        <p
          style={{
            backgroundColor: "#afa4a44a",
            padding: "25px",
          }}
        />
      </td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
  );
}
