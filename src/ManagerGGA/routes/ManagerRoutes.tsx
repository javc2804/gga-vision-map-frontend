import { Navigate, Route, Routes } from "react-router-dom";
import { ManagerGGAPage } from "../pages/ManagerGGAPage";
import ListPurchasePage from "../pages/ListPurchasePage";
import RegisterOutPage from "../pages/RegisterOutPage";
import DetailCompromisePage from "../pages/DetailCompromisePage";

const ManagerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ManagerGGAPage />} />
      <Route path="/register-out/:id?" element={<RegisterOutPage />} />
      <Route path="/notes-store" element={<DetailCompromisePage />} />
      <Route path="/list-purchases" element={<ListPurchasePage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default ManagerRoutes;
