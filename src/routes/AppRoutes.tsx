import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import { BooksPage } from "../pages/BooksPage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { CartPage } from "../pages/CartPage";

export function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<BooksPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}