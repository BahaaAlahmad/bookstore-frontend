import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { BookCard } from "./BookCard";
import type { Book } from "../../models/book";

const addItemMock = vi.fn();
const showToastMock = vi.fn();
const navigateMock = vi.fn();

vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({
    isAuthenticated: true,
  }),
}));

vi.mock("../../context/CartContext", () => ({
  useCart: () => ({
    addItem: addItemMock,
  }),
}));

vi.mock("../../context/ToastContext", () => ({
  useToast: () => ({
    showToast: showToastMock,
  }),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom",
  );

  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe("BookCard", () => {
  const book: Book = {
    id: 1,
    title: "Clean Code",
    author: "Robert Martin",
    price: 45.99,
    stock: 10,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays book information", () => {
    render(
      <BrowserRouter>
        <BookCard book={book} />
      </BrowserRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "Clean Code" }),
    ).toBeInTheDocument();

    expect(screen.getByText("By Robert Martin")).toBeInTheDocument();
    expect(screen.getByText("€45.99")).toBeInTheDocument();
    expect(screen.getByText("10 available")).toBeInTheDocument();
  });

  it("adds the book to the cart", async () => {
    addItemMock.mockResolvedValue(undefined);

    render(
      <BrowserRouter>
        <BookCard book={book} />
      </BrowserRouter>,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Add to cart" }),
    );

    await waitFor(() => {
      expect(addItemMock).toHaveBeenCalledWith(1);
    });

    expect(showToastMock).toHaveBeenCalledWith(
      "Clean Code added to your cart.",
      "success",
    );
  });

  it("disables the button when the book is out of stock", () => {
    const unavailableBook: Book = {
      ...book,
      stock: 0,
    };

    render(
      <BrowserRouter>
        <BookCard book={unavailableBook} />
      </BrowserRouter>,
    );

    expect(
      screen.getByRole("button", { name: "Add to cart" }),
    ).toBeDisabled();

    expect(screen.getByText("Out of stock")).toBeInTheDocument();
  });
});