import { Navigate, Route, Routes } from "react-router-dom";
import { ManagerGGAPage } from "../pages/ManagerGGAPage";
import RegisterPurchase from "../view/expenses/RegisterPurchase"; // Asegúrate de que la ruta de importación sea correcta
import RegisterPurchasePage from "../pages/RegisterPurchasePage";

const ManagerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ManagerGGAPage />} />
      <Route path="/register-purchase" element={<RegisterPurchasePage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default ManagerRoutes;
