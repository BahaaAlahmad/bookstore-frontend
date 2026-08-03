import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { CartPage } from "./CartPage";

const loadCartMock = vi.fn();
const updateItemMock = vi.fn();
const removeItemMock = vi.fn();
const clearCartMock = vi.fn();

const cartMock = {
  items: [
    {
      id: 1,
      bookId: 10,
      title: "Clean Code",
      author: "Robert Martin",
      unitPrice: 45.99,
      quantity: 2,
      subtotal: 91.98,
    },
  ],
  totalQuantity: 2,
  totalPrice: 91.98,
};

vi.mock("../context/CartContext", () => ({
  useCart: () => ({
    cart: cartMock,
    isLoading: false,
    error: null,
    loadCart: loadCartMock,
    updateItem: updateItemMock,
    removeItem: removeItemMock,
    clearCart: clearCartMock,
  }),
}));

vi.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    user: {
      id: 1,
      firstName: "Bahaa",
      lastName: "Ahmad",
      email: "bahaa@example.com",
      role: "USER",
    },
    isAuthenticated: true,
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
  }),
}));

function renderCartPage() {
  return render(
    <BrowserRouter>
      <CartPage />
    </BrowserRouter>,
  );
}

describe("CartPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    loadCartMock.mockResolvedValue(undefined);
    updateItemMock.mockResolvedValue(undefined);
    removeItemMock.mockResolvedValue(undefined);
    clearCartMock.mockResolvedValue(undefined);
  });

  it("loads and displays the shopping cart", async () => {
    renderCartPage();

    await waitFor(() => {
      expect(loadCartMock).toHaveBeenCalledOnce();
    });

    expect(
      screen.getByRole("heading", {
        name: "Shopping Cart",
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("Clean Code")).toBeInTheDocument();
    expect(screen.getByText("By Robert Martin")).toBeInTheDocument();
    expect(screen.getByText("Unit price: €45.99")).toBeInTheDocument();
    expect(screen.getByText("Subtotal: €91.98")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("€91.98")).toBeInTheDocument();
  });

  it("updates the cart item quantity", async () => {
    renderCartPage();

    const quantityInput = screen.getByLabelText("Quantity");

    fireEvent.change(quantityInput, {
      target: {
        value: "3",
      },
    });

    await waitFor(() => {
      expect(updateItemMock).toHaveBeenCalledWith(1, 3);
    });
  });

  it("removes an item from the cart", async () => {
    renderCartPage();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Remove",
      }),
    );

    await waitFor(() => {
      expect(removeItemMock).toHaveBeenCalledWith(1);
    });
  });

  it("clears the complete cart", async () => {
    renderCartPage();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Clear cart",
      }),
    );

    await waitFor(() => {
      expect(clearCartMock).toHaveBeenCalledOnce();
    });
  });

  it("contains a link to checkout", () => {
    renderCartPage();

    expect(
      screen.getByRole("link", {
        name: "Proceed to checkout",
      }),
    ).toHaveAttribute("href", "/checkout");
  });
});