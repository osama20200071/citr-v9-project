const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "usd",
});

export default function Cart({ cart, checkout }) {
  /*  
   & cart => is immutable cause it's coming from the parent
   ? that's why it's called one-way data flow => data always flows down
   ? car.push("any") => this has no effect on the cart in the parent 
  */

  let total = cart.reduce(
    (prev, current) => prev + current.pizza.sizes[current.size],
    0,
  );

  return (
    <div className="cart">
      <h2>Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            <span className="size">{item.size}</span> –
            <span className="type">{item.pizza.name}</span> –
            <span className="price">{item.price}</span>
          </li>
        ))}
      </ul>
      <p>Total: {intl.format(total)}</p>
      <button onClick={checkout}>Checkout</button>
    </div>
  );
}
