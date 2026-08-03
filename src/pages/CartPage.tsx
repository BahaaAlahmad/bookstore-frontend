import { useState } from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";
import { useCart } from "../context/CartContext";
import { LoadingSpinner } from "../components/layout/LoadingSpinner";
import { ErrorMessage } from "../components/layout/ErrorMessage";

export function CartPage() {
  const {
    cart,
    isLoading,
    error,
    updateItem,
    removeItem,
    clearCart,
  } = useCart();

  const [updatingItemId, setUpdatingItemId] = useState<number | null>(null);
  const [removingItemId, setRemovingItemId] = useState<number | null>(null);
  const [isClearing, setIsClearing] = useState(false);


  async function handleQuantityChange(
    cartItemId: number,
    quantity: number,
  ): Promise<void> {
    if (quantity < 1) {
      return;
    }

    try {
      setUpdatingItemId(cartItemId);
      await updateItem(cartItemId, quantity);
    } finally {
      setUpdatingItemId(null);
    }
  }

  async function handleRemove(cartItemId: number): Promise<void> {
    try {
      setRemovingItemId(cartItemId);
      await removeItem(cartItemId);
    } finally {
      setRemovingItemId(null);
    }
  }

  async function handleClearCart(): Promise<void> {
    try {
      setIsClearing(true);
      await clearCart();
    } finally {
      setIsClearing(false);
    }
  }

  if (isLoading) {
        return (
            <MainLayout>
                <LoadingSpinner message="Loading cart..." />
            </MainLayout>
        );
    }

  return (
    <MainLayout>
      <div className="cart-page__header">
        <h1>Shopping Cart</h1>

        {cart.items.length > 0 && (
          <button
            type="button"
            onClick={() => void handleClearCart()}
            disabled={isClearing}
          >
            {isClearing ? "Clearing..." : "Clear cart"}
          </button>
        )}
      </div>

      {error && <ErrorMessage message={error}/>}

      {cart.items.length === 0 ? (
        <section>
          <p>Your shopping cart is empty.</p>
          <Link to="/books">Continue shopping</Link>
        </section>
      ) : (
        <>
          <section className="cart-list">
            {cart.items.map((item) => {
              const isUpdating = updatingItemId === item.id;
              const isRemoving = removingItemId === item.id;

              return (
                <article key={item.id} className="cart-item">
                  <div className="cart-item__details">
                    <h2>{item.title}</h2>
                    <p>By {item.author}</p>
                    <p>Unit price: €{item.unitPrice.toFixed(2)}</p>
                    <p>Subtotal: €{item.subtotal.toFixed(2)}</p>
                  </div>

                  <div className="cart-item__actions">
                    <label htmlFor={`quantity-${item.id}`}>
                      Quantity
                    </label>

                    <input
                      id={`quantity-${item.id}`}
                      type="number"
                      min={1}
                      value={item.quantity}
                      disabled={isUpdating || isRemoving}
                      onChange={(event) =>
                        void handleQuantityChange(
                          item.id,
                          Number(event.target.value),
                        )
                      }
                    />

                    <button
                      type="button"
                      onClick={() => void handleRemove(item.id)}
                      disabled={isRemoving || isUpdating}
                    >
                      {isRemoving ? "Removing..." : "Remove"}
                    </button>
                  </div>
                </article>
              );
            })}
          </section>

          <section className="cart-summary">
            <h2>Order summary</h2>

            <p>
              Total items: <strong>{cart.totalQuantity}</strong>
            </p>

            <p>
              Total price:{" "}
              <strong>€{cart.totalPrice.toFixed(2)}</strong>
            </p>

            <Link to="/checkout" className="button-link">
              Proceed to checkout
            </Link>
          </section>
        </>
      )}
    </MainLayout>
  );
}