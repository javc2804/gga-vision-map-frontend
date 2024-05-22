import { Navigate, Route, Routes } from "react-router-dom";
import { ManagerGGAPage } from "../pages/ManagerGGAPage";
import ListPurchasePage from "../pages/ListPurchasePage";
import RegisterOutPage from "../pages/RegisterOutPage";
import DetailPurchasePage from "../pages/DetailPurchasePage";

const ManagerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ManagerGGAPage />} />
      <Route path="/register-out/:id?" element={<RegisterOutPage />} />
      <Route path="/notes-store" element={<DetailPurchasePage />} />
      <Route path="/list-purchases" element={<ListPurchasePage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default ManagerRoutes;
