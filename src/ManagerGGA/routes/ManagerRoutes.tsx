import { Navigate, Route, Routes } from "react-router-dom";
import { ManagerGGAPage } from "../pages/ManagerGGAPage";
import ListPurchasePage from "../pages/ListPurchasePage";
import RegisterOutPage from "../pages/RegisterOutPage";
import DetailCompromisePage from "../pages/DetailCompromisePage";
import GraphsOutPage from "../pages/GraphsOutPage";
import UsersPage from "../pages/UsersPage";
import ProvidersPage from "../pages/ProvidersPage";
import SparePartsPage from "../pages/SparePartsPage";
import RegisterOutInternal from "../pages/RegisterOutInternalPage";
import ListOutInternal from "../pages/ListOutInternalPage";
import CreateNoteInvoicePage from "../pages/CreateNoteInvoicePage";
import ListNoteInvoicesPage from "../pages/ListNoteInvoicesPage";
import { Inventory } from "@mui/icons-material";
import InventoryPage from "../pages/InventoryPage";

const ManagerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ManagerGGAPage />} />
      <Route path="/register-out/:params?" element={<RegisterOutPage />} />
      <Route path="/notes-store" element={<DetailCompromisePage />} />
      <Route path="/list-purchases" element={<ListPurchasePage />} />
      <Route path="/register-internal" element={<RegisterOutInternal />} />
      <Route path="/list-internal" element={<ListOutInternal />} />
      <Route path="/graphs-out" element={<GraphsOutPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/providers" element={<ProvidersPage />} />
      <Route path="/spareparts" element={<SparePartsPage />} />
      <Route path="/note-invoices" element={<CreateNoteInvoicePage />} />
      <Route path="/note-invoices-list" element={<ListNoteInvoicesPage />} />
      <Route path="/inventory" element={<InventoryPage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default ManagerRoutes;
