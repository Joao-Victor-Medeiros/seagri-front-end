import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "@/pages/home";
import BeneficiariesPage from "@/pages/beneficiaries";
import LoginPage from "@/pages/login";
import NotFoundPage from "@/pages/not-found";
import ReportsPage from "@/pages/reports";
import { RequireAuth } from "@/routes/require-auth";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={<Navigate to="/cadatro-beneficiario" replace />}
      />
      <Route
        path="/cadatro-beneficiario"
        element={
          <RequireAuth>
            <HomePage />
          </RequireAuth>
        }
      />
      <Route
        path="/relatorios"
        element={
          <RequireAuth>
            <ReportsPage />
          </RequireAuth>
        }
      />
      <Route
        path="/beneficiarios"
        element={
          <RequireAuth>
            <BeneficiariesPage />
          </RequireAuth>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
