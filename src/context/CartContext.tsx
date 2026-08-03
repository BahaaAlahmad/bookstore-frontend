import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  addCartItem,
  clearCart as clearCartRequest,
  getCart,
  removeCartItem,
  updateCartItem,
} from "../api/cartApi";

import type { Cart } from "../models/cart";
import { useAuth } from "./AuthContext";

interface CartContextValue {
  cart: Cart;
  isLoading: boolean;
  error: string | null;
  loadCart: () => Promise<void>;
  addItem: (bookId: number, quantity?: number) => Promise<void>;
  updateItem: (cartItemId: number, quantity: number) => Promise<void>;
  removeItem: (cartItemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  resetCart: () => void;
}

interface CartProviderProps {
  children: ReactNode;
}

const emptyCart: Cart = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: CartProviderProps) {
  const { isAuthenticated } = useAuth();

  const [cart, setCart] = useState<Cart>(emptyCart);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetCart = useCallback(() => {
    setCart({
        items: [],
        totalQuantity: 0,
        totalPrice: 0,
    });

    setError(null);
    }, []);


  const loadCart = useCallback(async (): Promise<void> => {
    if (!isAuthenticated) {
      resetCart();
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await getCart();
      setCart(response);
    } catch {
      setError("Unable to load the shopping cart.");
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, resetCart]);

  useEffect(() => {
    if (isAuthenticated) {
        void loadCart();
    } else {
        resetCart();
    }
    }, [isAuthenticated, loadCart, resetCart]);

  const addItem = useCallback(
    async (bookId: number, quantity = 1): Promise<void> => {
      try {
        setError(null);

        const response = await addCartItem({
          bookId,
          quantity,
        });

        setCart(response);
      } catch {
        setError("Unable to add the book to the cart.");
        throw new Error("Unable to add the book to the cart.");
      }
    },
    [],
  );

  const updateItem = useCallback(
    async (cartItemId: number, quantity: number): Promise<void> => {
      if (quantity < 1) {
        throw new Error("Quantity must be greater than zero.");
      }

      try {
        setError(null);

        const response = await updateCartItem(cartItemId, {
          quantity,
        });

        setCart(response);
      } catch {
        setError("Unable to update the cart item.");
        throw new Error("Unable to update the cart item.");
      }
    },
    [],
  );

  const removeItem = useCallback(
    async (cartItemId: number): Promise<void> => {
      try {
        setError(null);

        const response = await removeCartItem(cartItemId);
        setCart(response);
      } catch {
        setError("Unable to remove the cart item.");
        throw new Error("Unable to remove the cart item.");
      }
    },
    [],
  );

  const clearCart = useCallback(async (): Promise<void> => {
    try {
      setError(null);

      await clearCartRequest();
      setCart(emptyCart);
    } catch {
      setError("Unable to clear the shopping cart.");
      throw new Error("Unable to clear the shopping cart.");
    }
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      isLoading,
      error,
      loadCart,
      addItem,
      updateItem,
      removeItem,
      clearCart,
      resetCart,
    }),
    [
      cart,
      isLoading,
      error,
      loadCart,
      addItem,
      updateItem,
      removeItem,
      clearCart,
      resetCart,
    ],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}