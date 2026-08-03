import axiosClient from "./axiosClient";
import type { Book } from "../models/book";

export async function getBooks(): Promise<Book[]> {
  const response = await axiosClient.get<Book[]>("/books");
  return response.data;
}

export async function getBookById(id: number): Promise<Book> {
  const response = await axiosClient.get<Book>(`/books/${id}`);
  return response.data;
}