import { Routes, Route } from "react-router-dom";
import ProductsPage from "../pages/ProductsPage";
import ConfirmProductPage from "../pages/ConfirmProductPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="/confirm" element={<ConfirmProductPage />} />
    </Routes>
  );
}
