export interface AddCartItemRequest {
  bookId: number;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

export interface CartItem {
  id: number;
  bookId: number;
  title: string;
  author: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

export interface Cart {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}