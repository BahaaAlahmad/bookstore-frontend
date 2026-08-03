import axiosClient from "./axiosClient";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "../models/auth";

export async function register(
  request: RegisterRequest,
): Promise<AuthResponse> {
  const response = await axiosClient.post<AuthResponse>(
    "/auth/register",
    request,
  );

  return response.data;
}

export async function login(
  request: LoginRequest,
): Promise<AuthResponse> {
  const response = await axiosClient.post<AuthResponse>(
    "/auth/login",
    request,
  );

  return response.data;
}