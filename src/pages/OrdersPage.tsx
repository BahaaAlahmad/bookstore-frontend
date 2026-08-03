import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";
import { getOrders } from "../api/orderApi";
import type { Order } from "../models/order";
import { LoadingSpinner } from "../components/layout/LoadingSpinner";
import { ErrorMessage } from "../components/layout/ErrorMessage";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";

export function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadOrders(): Promise<void> {
      try {
        setError(null);

        const response = await getOrders();
        setOrders(response);
      } catch {
        setError(
    getApiErrorMessage(
      error,
      "Unable to load your orders.",
    ),
  );
        setError("Unable to load your orders.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadOrders();
  }, []);

  if (isLoading) {
    return (
        <MainLayout>
        <LoadingSpinner message="Loading order..." />
        </MainLayout>
    );
    }

  return (
    <MainLayout>
      <h1>My Orders</h1>

      {error && (
        <ErrorMessage message={error}/>
      )}

      {orders.length === 0 ? (
        <section>
          <p>You have not placed any orders yet.</p>
          <Link to="/books">Browse books</Link>
        </section>
      ) : (
        <section className="orders-list">
          {orders.map((order) => (
            <article key={order.id} className="order-card">
              <div>
                <h2>Order #{order.id}</h2>

                <p>
                  Date:{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </p>

                <p>
                  Status:{" "}
                  <strong>{order.status}</strong>
                </p>

                <p>
                  Items:{" "}
                  {order.items.reduce(
                    (total, item) => total + item.quantity,
                    0,
                  )}
                </p>

                <p>
                  Total:{" "}
                  <strong>€{order.totalPrice.toFixed(2)}</strong>
                </p>
              </div>

              <Link
                to={`/orders/${order.id}`}
                className="button-link"
              >
                View details
              </Link>
            </article>
          ))}
        </section>
      )}
    </MainLayout>
  );
}