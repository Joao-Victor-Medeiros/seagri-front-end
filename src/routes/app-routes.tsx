import { Route, Routes } from "react-router-dom";
import HomePage from "@/pages/home";
import NotFoundPage from "@/pages/not-found";
import ReportsPage from "@/pages/reports";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/relatorios" element={<ReportsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
