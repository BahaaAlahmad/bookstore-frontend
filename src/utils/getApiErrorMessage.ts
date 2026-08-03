import { isAxiosError } from "axios";

interface ApiErrorResponse {
  message?: string;
}

export function getApiErrorMessage(
  error: unknown,
  fallbackMessage: string,
): string {
  if (isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data?.message ?? fallbackMessage;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallbackMessage;
}