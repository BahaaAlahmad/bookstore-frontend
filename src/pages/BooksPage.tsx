import { useEffect, useState } from "react";
import { getBooks } from "../api/bookApi";
import { BookCard } from "../components/books/BookCard";
import type { Book } from "../models/book";

export function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBooks() {
      try {
        const result = await getBooks();
        setBooks(result);
      } catch {
        setError("Unable to load books.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadBooks();
  }, []);

  if (isLoading) {
    return <p>Loading books...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  return (
    <main>
      <h1>Online Bookstore</h1>

      {books.length === 0 ? (
        <p>No books are currently available.</p>
      ) : (
        <section>
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </section>
      )}
    </main>
  );
}