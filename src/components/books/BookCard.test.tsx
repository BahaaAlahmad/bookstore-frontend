import { render, screen } from "@testing-library/react";
import { BookCard } from "./BookCard";
import type { Book } from "../../models/book";

describe("BookCard", () => {
  it("displays book information", () => {
    const book: Book = {
      id: 1,
      title: "Clean Code",
      author: "Robert Martin",
      price: 45.99,
      stock: 10,
    };

    render(<BookCard book={book} />);

    expect(
      screen.getByRole("heading", { name: "Clean Code" }),
    ).toBeInTheDocument();

    expect(screen.getByText("By Robert Martin")).toBeInTheDocument();
    expect(screen.getByText("€45.99")).toBeInTheDocument();
    expect(screen.getByText("10 available")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Add to cart" }),
    ).toBeEnabled();
  });

  it("disables the cart button when the book is out of stock", () => {
    const book: Book = {
      id: 2,
      title: "Effective Java",
      author: "Joshua Bloch",
      price: 55.99,
      stock: 0,
    };

    render(<BookCard book={book} />);

    expect(screen.getByText("Out of stock")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Add to cart" }),
    ).toBeDisabled();
  });
});