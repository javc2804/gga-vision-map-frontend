import { Navigate, Route, Routes } from "react-router-dom";
import { ManagerGGAPage } from "../pages/ManagerGGAPage";
import RegisterPurchasePage from "../pages/RegisterPurchasePage";
import ListPurchasePage from "../pages/ListPurchasePage";

const ManagerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ManagerGGAPage />} />
      <Route path="/register-purchase" element={<RegisterPurchasePage />} />
      <Route path="/list-purchases" element={<ListPurchasePage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default ManagerRoutes;
