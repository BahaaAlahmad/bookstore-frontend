import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { isAxiosError } from "axios";

import { useAuth } from "../context/AuthContext";
import { ErrorMessage } from "../components/layout/ErrorMessage";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";

interface ApiErrorResponse {
  message?: string;
}

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setError(null);
      setIsSubmitting(true);

      await login({
        email: email.trim(),
        password,
      });

      navigate("/books");
    } catch (requestError) {
      if (isAxiosError<ApiErrorResponse>(requestError)) {
        setError(
    getApiErrorMessage(
      error,
      requestError.response?.data?.message ??
            "Login failed. Please check your credentials.",
    ),
  );
        setError(
          requestError.response?.data?.message ??
            "Login failed. Please check your credentials.",
        );
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Login</h1>

        {error && <ErrorMessage message={error}/>}

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p>
          No account yet? <Link to="/register">Register</Link>
        </p>
      </section>
    </main>
  );
}