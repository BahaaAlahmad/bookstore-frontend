import axiosClient from "./axiosClient";

import type {
  AddCartItemRequest,
  Cart,
  UpdateCartItemRequest,
} from "../models/cart";

export async function getCart(): Promise<Cart> {
  const response = await axiosClient.get<Cart>("/cart");

  return response.data;
}

export async function addCartItem(
  request: AddCartItemRequest,
): Promise<Cart> {
  const response = await axiosClient.post<Cart>(
    "/cart/items",
    request,
  );

  return response.data;
}

export async function updateCartItem(
  cartItemId: number,
  request: UpdateCartItemRequest,
): Promise<Cart> {
  const response = await axiosClient.put<Cart>(
    `/cart/items/${cartItemId}`,
    request,
  );

  return response.data;
}

export async function removeCartItem(
  cartItemId: number,
): Promise<Cart> {
  const response = await axiosClient.delete<Cart>(
    `/cart/items/${cartItemId}`,
  );

  return response.data;
}

export async function clearCart(): Promise<void> {
  await axiosClient.delete("/cart");
}