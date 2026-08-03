import axiosClient from "./axiosClient";
import type { Order } from "../models/order";

export async function checkout(): Promise<Order> {
  const response = await axiosClient.post<Order>("/orders/checkout");

  return response.data;
}

export async function getOrders(): Promise<Order[]> {
  const response = await axiosClient.get<Order[]>("/orders");

  return response.data;
}

export async function getOrderById(orderId: number): Promise<Order> {
  const response = await axiosClient.get<Order>(
    `/orders/${orderId}`,
  );

  return response.data;
}