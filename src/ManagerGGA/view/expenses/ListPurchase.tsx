import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  TablePagination,
  TableHead,
  TableRow,
} from "@mui/material";
import { useSelector } from "react-redux";

import { Filters } from "../../components/filters/Filters";
import { SortableTableHeader } from "../../components/ListPurchase/SortableTableHeader";
import { TableRowData } from "../../components/ListPurchase/TableRowData";

import useTableList from "../../hooks/useTableList";
import { usePurchaseList } from "../../hooks/usePurchaseList";

import Loading from "../../../components/Loading";
import { useState } from "react";
export interface IRow {
  ID: number;
  Fecha: string;
  UT: string;
  Eje: string;
  "Sub-eje": string;
  "NDE(a)": string;
  FacProv: string;
  Proveedor: string;
  Compromiso: string;
  Repuesto: string;
  Cantidad: number;
  "Total Bs": number;
  "Total $": number;
  "Deuda $": number;
  [key: string]: string | number;
}

export const ListPurchase = () => {
  const headers = [
    "id",
    "createdAt",
    // "facNDE",
    "proveedor",
    "ut",
    "marcaModelo",
    "eje",
    // "subeje",
    "cantidad",
    "formaPago",
    // "compromiso",
    // "descripcion",
    "repuesto",
    "descripcionRepuesto",
    "montoTotalBs",
    "montoTotalUsd",
    // "tasaBcv",
    // "fechaOcOs",
    // "numeroOrdenPago",
    // "observacion",
    // "ocOs",
    // "precioUnitarioBs",
    // "precioUnitarioUsd",
    // "updatedAt",
    // "user_rel",
  ];

  const {
    order,
    orderBy,
    page,
    rowsPerPage,
    handleSortRequest,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useTableList([]);

  const { filters, updateFilter, filteredData } = usePurchaseList(
    page,
    rowsPerPage
  );
  const [pageSize, setPageSize] = useState(10); // puedes cambiar 10 a cualquier valor inicial que desees

  const loading = useSelector((state: any) => state.purchase.loading);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <TableContainer component={Paper}>
          <h2>Registro de transacciones</h2>
          <Filters
            headers={headers}
            filters={filters}
            updateFilter={updateFilter}
          />
          <div style={{ maxHeight: "60vh", overflow: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <SortableTableHeader
                      key={header}
                      header={header}
                      orderBy={orderBy}
                      order={order}
                      onSortRequest={handleSortRequest}
                    />
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData
                  .slice(
                    Math.max(0, (page - 1) * rowsPerPage),
                    Math.max(0, (page - 1) * rowsPerPage) + rowsPerPage
                  )
                  .map((row: any) => (
                    <TableRowData key={row.id} row={row} headers={headers} />
                  ))}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredData.length}
            rowsPerPage={pageSize}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}
    </>
  );
};

export default ListPurchase;
