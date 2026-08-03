import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type { Book } from "../../models/book";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();
  const { showToast } = useToast();

  const [isAdding, setIsAdding] = useState(false);

  async function handleAddToCart(): Promise<void> {
    if (!isAuthenticated) {
      showToast("Please login first.", "info");
      navigate("/login");
      return;
    }

    try {
      setIsAdding(true);

      await addItem(book.id);

      showToast(`${book.title} added to your cart.`, "success");
    } catch {
      showToast("Unable to add the book to the cart.", "error");
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <article className="book-card">
      {book.imageUrl ? (
        <img
          src={book.imageUrl}
          alt={`Cover of ${book.title}`}
          className="book-card__image"
        />
      ) : (
        <div className="book-card__placeholder">
          No image available
        </div>
      )}

      <div className="book-card__content">
        <h2>{book.title}</h2>

        <p>By {book.author}</p>

        {book.description && (
          <p>{book.description}</p>
        )}

        <p className="book-card__price">
          €{book.price.toFixed(2)}
        </p>

        <p>
          {book.stock > 0
            ? `${book.stock} available`
            : "Out of stock"}
        </p>

        <button
          type="button"
          disabled={book.stock === 0 || isAdding}
          onClick={() => void handleAddToCart()}
        >
          {isAdding ? "Adding..." : "Add to cart"}
        </button>
      </div>
    </article>
  );
}