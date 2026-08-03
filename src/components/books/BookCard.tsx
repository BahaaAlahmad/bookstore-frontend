import { useState } from "react";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import type { Book } from "../../models/book";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();

  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleAddToCart(): Promise<void> {
    if (!isAuthenticated) {
      setMessage("Please login to add books to your cart.");
      return;
    }

    try {
      setMessage(null);
      setIsAdding(true);

      await addItem(book.id);

      setMessage("Book added to cart.");
    } catch {
      setMessage("Unable to add the book to the cart.");
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <article className="book-card">
      {book.imageUrl ? (
        <img
          src={book.imageUrl}
          alt={book.title}
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

        {message && (
          <p className="book-card__message">
            {message}
          </p>
        )}
      </div>
    </article>
  );
}