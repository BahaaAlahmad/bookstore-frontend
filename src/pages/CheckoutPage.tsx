import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";
import { checkout } from "../api/orderApi";
import { useCart } from "../context/CartContext";
import { ErrorMessage } from "../components/layout/ErrorMessage";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";

export function CheckoutPage() {
  const navigate = useNavigate();

  const { cart, resetCart } = useCart();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout(): Promise<void> {
    try {
        setError(null);
        setIsSubmitting(true);

        const order = await checkout();

        resetCart();

        navigate(`/orders/${order.id}`);
    } catch {
        setError(
    getApiErrorMessage(
      error,
      "Unable to complete the checkout.",
    ),
  );
    } finally {
        setIsSubmitting(false);
    }
    }

  if (cart.items.length === 0) {
    return (
      <MainLayout>
        <h1>Checkout</h1>
        <p>Your cart is empty.</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1>Checkout</h1>

      {error && (
        <ErrorMessage message={error}/>
      )}

      <section className="checkout-summary">
        <h2>Order Summary</h2>

        {cart.items.map((item) => (
          <div
            key={item.id}
            className="checkout-item"
          >
            <span>
              {item.title} × {item.quantity}
            </span>

            <strong>
              €{item.subtotal.toFixed(2)}
            </strong>
          </div>
        ))}

        <hr />

        <div className="checkout-total">
          <strong>Total</strong>

          <strong>
            €{cart.totalPrice.toFixed(2)}
          </strong>
        </div>

        <button
          type="button"
          onClick={() => void handleCheckout()}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Processing..."
            : "Confirm Order"}
        </button>
      </section>
    </MainLayout>
  );
}