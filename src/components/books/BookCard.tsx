import type { Book } from "../../models/book";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <article>
      {book.imageUrl && (
        <img
          src={book.imageUrl}
          alt={`Cover of ${book.title}`}
          width="160"
        />
      )}

      <h2>{book.title}</h2>
      <p>By {book.author}</p>
      <p>€{book.price.toFixed(2)}</p>
      <p>{book.stock > 0 ? `${book.stock} available` : "Out of stock"}</p>

      <button type="button" disabled={book.stock === 0}>
        Add to cart
      </button>
    </article>
  );
}