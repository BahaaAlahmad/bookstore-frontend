import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BooksPage } from "../pages/BooksPage";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BooksPage />} />
        <Route path="/books" element={<BooksPage />} />
      </Routes>
    </BrowserRouter>
  );
}