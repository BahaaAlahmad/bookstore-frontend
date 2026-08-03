import { MainLayout } from "../components/layout/MainLayout";
import { useEffect, useState } from "react";
import { getBooks } from "../api/bookApi";
import { BookCard } from "../components/books/BookCard";
import type { Book } from "../models/book";
import { LoadingSpinner } from "../components/layout/LoadingSpinner";
import { ErrorMessage } from "../components/layout/ErrorMessage";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";

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
        setError(
    getApiErrorMessage(
      error,
      "Unable to load books",
    ),
  );
      } finally {
        setIsLoading(false);
      }
    }

    void loadBooks();
  }, []);

  if (isLoading) {
    return (
      <MainLayout>
        <LoadingSpinner message="Loading books..." />
      </MainLayout>
    );
  }

  if (error) {
    return (
        <MainLayout>
            <ErrorMessage
                message={error}
            />
        </MainLayout>
    );
  }

  return (
    <MainLayout>
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
    </MainLayout>
  );
}