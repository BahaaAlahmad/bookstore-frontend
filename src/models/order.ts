export type OrderStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

export interface OrderItem {
  id: number;
  bookId: number;
  title: string;
  author: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Order {
  id: number;
  status: OrderStatus;
  totalPrice: number;
  createdAt: string;
  items: OrderItem[];
}