import { Routes, Route } from "react-router-dom";
import ProductsPage from "../pages/ProductsPage";
import ConfirmProductPage from "../pages/ConfirmProductPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="/confirm" element={<ConfirmProductPage />} />
      <Route path="/products/:id" element={<ProductDetailsPage />} />
    </Routes>
  );
}
