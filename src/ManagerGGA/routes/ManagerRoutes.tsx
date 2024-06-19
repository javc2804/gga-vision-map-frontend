import { Navigate, Route, Routes } from "react-router-dom";
import { ManagerGGAPage } from "../pages/ManagerGGAPage";
import ListPurchasePage from "../pages/ListPurchasePage";
import RegisterOutPage from "../pages/RegisterOutPage";
import DetailCompromisePage from "../pages/DetailCompromisePage";
import GraphsOutPage from "../pages/GraphsOutPage";
import UsersPage from "../pages/UsersPage";

const ManagerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ManagerGGAPage />} />
      <Route path="/register-out/:params?" element={<RegisterOutPage />} />
      <Route path="/notes-store" element={<DetailCompromisePage />} />
      <Route path="/list-purchases" element={<ListPurchasePage />} />
      <Route path="/graphs-out" element={<GraphsOutPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default ManagerRoutes;
