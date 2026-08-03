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
import { CheckoutPage } from "../pages/CheckoutPage";
import { OrdersPage } from "../pages/OrdersPage";
import { OrderDetailsPage } from "../pages/OrderDetailsPage";
import { NotFoundPage } from "../pages/NotFoundPage";

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


        <Route
            path="/checkout"
            element={
                <ProtectedRoute>
                    <CheckoutPage />
                </ProtectedRoute>
            }
        />
        <Route
            path="/orders"
            element={
                <ProtectedRoute>
                <OrdersPage />
                </ProtectedRoute>
            }
        />

        <Route
            path="/orders/:orderId"
            element={
                <ProtectedRoute>
                <OrderDetailsPage />
                </ProtectedRoute>
            }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}