import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";
import { getOrderById } from "../api/orderApi";
import type { Order } from "../models/order";
import { LoadingSpinner } from "../components/layout/LoadingSpinner";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";

export function OrderDetailsPage() {
  const { orderId } = useParams<{ orderId: string }>();

  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadOrder(): Promise<void> {
      const parsedOrderId = Number(orderId);

      if (!orderId || Number.isNaN(parsedOrderId)) {
        setError("Invalid order id.");
        setIsLoading(false);
        return;
      }

      try {
        setError(null);

        const response = await getOrderById(parsedOrderId);
        setOrder(response);
      } catch {
        setError(
    getApiErrorMessage(
      error,
      "Unable to load the order.",
    ),
  );
        setError("Unable to load the order.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadOrder();
  }, [orderId]);

  if (isLoading) {
    return (
        <MainLayout>
            <LoadingSpinner message="Loading orders..." />
        </MainLayout>
        );
    }

  if (error || !order) {
    return (
      <MainLayout>
        <p role="alert" className="error">
          {error ?? "Order not found."}
        </p>

        <Link to="/orders">Back to orders</Link>
      </MainLayout>
    );
  }

  const totalQuantity = order.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <MainLayout>
      <div className="order-details__header">
        <div>
          <h1>Order #{order.id}</h1>

          <p>
            Placed on{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>

          <p>
            Status: <strong>{order.status}</strong>
          </p>
        </div>

        <Link to="/orders">Back to orders</Link>
      </div>

      <section className="order-details__items">
        <h2>Items</h2>

        {order.items.map((item) => (
          <article key={item.id} className="order-details__item">
            <div>
              <h3>{item.title}</h3>
              <p>By {item.author}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Unit price: €{item.unitPrice.toFixed(2)}</p>
            </div>

            <strong>€{item.subtotal.toFixed(2)}</strong>
          </article>
        ))}
      </section>

      <section className="order-details__summary">
        <h2>Summary</h2>

        <p>
          Total items: <strong>{totalQuantity}</strong>
        </p>

        <p>
          Total price:{" "}
          <strong>€{order.totalPrice.toFixed(2)}</strong>
        </p>
      </section>
    </MainLayout>
  );
}