import { Route, Routes } from "react-router-dom";
import HomePage from "@/pages/home";
import NotFoundPage from "@/pages/not-found";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
