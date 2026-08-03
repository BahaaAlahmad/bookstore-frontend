interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({
  message = "Loading...",
}: LoadingSpinnerProps) {
  return (
    <div
      className="loading-spinner"
      role="status"
      aria-live="polite"
    >
      <div
        className="loading-spinner__circle"
        aria-hidden="true"
      />

      <span>{message}</span>
    </div>
  );
}