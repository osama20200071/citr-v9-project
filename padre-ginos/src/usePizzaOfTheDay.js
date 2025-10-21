import { useDebugValue, useEffect, useState } from "react";

export const usePizzaOfTheDay = () => {
  const [pizzaOfTheDay, setPizzaOfTheDay] = useState(null);
  useDebugValue(pizzaOfTheDay ? `${pizzaOfTheDay.name}` : "Loading...");

  useEffect(() => {
    async function fetchPizza() {
      // await new Promise((res) => setTimeout(res, 5000));
      const res = await fetch("/api/pizza-of-the-day");
      const data = await res.json();
      setPizzaOfTheDay(data);
    }

    fetchPizza();
  }, []);

  return pizzaOfTheDay;
};
