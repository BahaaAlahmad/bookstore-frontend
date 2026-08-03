import { Link } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";

export function NotFoundPage() {
  return (
    <MainLayout>
      <p className="not-found-page__code">404</p>

      <h1>Page not found</h1>

      <p>
        The page you are looking for does not exist or may have been moved.
      </p>

      <Link to="/books" className="button-link">
        Return to books
      </Link>
    </MainLayout>
  );
}