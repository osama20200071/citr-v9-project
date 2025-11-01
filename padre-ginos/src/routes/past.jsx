import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense, use, useEffect, useState } from "react";
import { getPastOrders } from "../api/getPastOrders";
import { getPastOrder } from "../api/getPastOrder";
import Modal from "../Modal";
import PastOrder from "../PastOrder";
import ErrorBoundary from "../ErrorBoundary";

export const Route = createFileRoute("/past")({
  component: PastOrderRouteWithErrorBoundary,
});

function PastOrderRouteWithErrorBoundary() {
  const [page, setPage] = useState(1);
  const promisedData = useQuery({
    queryKey: ["past-orders", page],
    queryFn: () => getPastOrders(page),
    staleTime: 30000, // data becomes stale after 30 seconds
  }).promise;
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="past-orders">
            <h2>Loading Past Orders …</h2>
          </div>
        }
      >
        <PastOrdersRoute
          page={page}
          setPage={setPage}
          promisedData={promisedData}
        />
      </Suspense>
    </ErrorBoundary>
  );
}

function PastOrdersRoute({ page, setPage, promisedData }) {
  const data = use(promisedData);
  const [selectedOrder, setSelectedOrder] = useState();

  const { data: pastSelectedOrder, isLoading: isLoadingPastOrder } = useQuery({
    queryKey: ["past-order", selectedOrder],
    queryFn: () => getPastOrder(selectedOrder),
    enabled: !!selectedOrder,
    staleTime: 1000 * 60 * 60 * 24, // stale time for a day
  });

  // testing the error boundary
  // if (pastSelectedOrder) {
  //   throw new Error("error happened");
  // }

  // if (isLoading) {
  //   return (
  //     <div className="past-orders">
  //       <h2>LOADING …</h2>
  //     </div>
  //   );
  // }

  return (
    <div className="past-orders">
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Date</td>
            <td>Time</td>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr
              key={order.order_id}
              onClick={() => setSelectedOrder(order.order_id)}
            >
              <td>{order.order_id}</td>
              <td>{order.date}</td>
              <td>{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pages">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <div>{page}</div>
        <button disabled={data.length < 10} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>

      {selectedOrder && (
        <Modal>
          <PastOrder
            isLoading={isLoadingPastOrder}
            data={pastSelectedOrder}
            setFocusedOrder={setSelectedOrder}
          />
        </Modal>
      )}
    </div>
  );
}
