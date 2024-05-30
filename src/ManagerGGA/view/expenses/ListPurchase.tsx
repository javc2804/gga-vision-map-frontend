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
    "cantidad",
    "compromiso",
    "createdAt",
    "descripcion",
    "descripcionRepuesto",
    "eje",
    "facNDE",
    "fechaOcOs",
    "formaPago",
    "id",
    "marcaModelo",
    "montoTotalBs",
    "montoTotalUsd",
    "numeroOrdenPago",
    "observacion",
    "ocOs",
    "precioUnitarioBs",
    "precioUnitarioUsd",
    "proveedor",
    "repuesto",
    "subeje",
    "tasaBcv",
    "updatedAt",
    "user_rel",
    "ut",
  ];

  const { filters, updateFilter, filteredData } = usePurchaseList();

  const {
    order,
    orderBy,
    page,
    rowsPerPage,
    handleSortRequest,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useTableList(filteredData);

  const loading = useSelector((state: any) => state.purchase.loading);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <TableContainer component={Paper}>
          <Filters
            headers={headers}
            filters={filters}
            updateFilter={updateFilter}
          />
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
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any) => (
                  <TableRowData key={row.id} row={row} headers={headers} />
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
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
