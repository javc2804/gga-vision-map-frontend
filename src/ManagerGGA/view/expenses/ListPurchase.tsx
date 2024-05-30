import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  TablePagination,
  TableHead, // Añade esto
  TableRow,
  TextField,
  Box,
} from "@mui/material";
import useTableList from "../../hooks/useTableList";
import { SortableTableHeader } from "../../components/ListPurchase/SortableTableHeader";
import { TableRowData } from "../../components/ListPurchase/TableRowData";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useDispatch, useSelector } from "react-redux";
import { startGetListPurchase } from "../../../store/purchase/purchaseThunks";

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

  const dispatch = useDispatch();

  const [data, setData] = useState([{}]);

  const currentYear = new Date().getFullYear();
  const [dateRange, setDateRange] = React.useState([
    new Date(currentYear, 0, 1),
    new Date(),
  ]);

  const startDate = new Date(dateRange[0]).toISOString();
  const endDate = new Date(dateRange[1]).toISOString();

  const dataDate = {
    startDate,
    endDate,
  };

  useEffect(() => {
    dispatch(startGetListPurchase(dataDate));
  }, []);

  const resp = useSelector((state: any) => state.purchase);
  const purchaseData = resp.purchase;

  useEffect(() => {
    setData(purchaseData);
  }, [purchaseData]);

  const [filters, setFilters] = useState({});
  const updateFilter = (field: any, value: any) => {
    if (field === "Fecha") {
      setDateRange(value);
    } else {
      setFilters({
        ...filters,
        [field]: value,
      });
    }
  };

  let filteredRows: any = [];
  if (data) {
    filteredRows = data.filter((row: any) => {
      const date = new Date(row.createdAt);
      return date >= dateRange[0] && date <= dateRange[1];
    });
  }
  const filteredData = filteredRows.filter((row: any) =>
    Object.entries(filters).every(([field, value]) => {
      if (field !== "Fecha") {
        return String(row[field])
          .toLowerCase()
          .includes(String(value).toLowerCase());
      }
      return true;
    })
  );

  const {
    sortedData,
    order,
    orderBy,
    page,
    rowsPerPage,
    handleSortRequest,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useTableList(filteredData);

  return (
    <TableContainer component={Paper}>
      <div>
        {headers.map((header) =>
          header !== "Fecha" ? (
            <TextField
              key={header}
              label={`Filter by ${header}`}
              value={filters[header] || ""}
              onChange={(e) => updateFilter(header, e.target.value)}
            />
          ) : null
        )}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Start date"
            value={dateRange[0]}
            onChange={(newValue) =>
              updateFilter("Fecha", [newValue, dateRange[1]])
            }
          />
          <DatePicker
            label="End date"
            value={dateRange[1]}
            onChange={(newValue) =>
              updateFilter("Fecha", [dateRange[0], newValue])
            }
          />
        </LocalizationProvider>
      </div>
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
  );
};

export default ListPurchase;
