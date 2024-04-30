import { Navigate, Route, Routes } from "react-router-dom";
import { ManagerGGAPage } from "../pages/ManagerGGAPage";
const ManagerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ManagerGGAPage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default ManagerRoutes;
