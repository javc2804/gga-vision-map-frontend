import React, { useState } from "react";
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
    "ID",
    "Fecha",
    "UT",
    "Eje",
    "Sub-eje",
    "NDE(a)",
    "FacProv",
    "Proveedor",
    "Compromiso",
    "Repuesto",
    "Cantidad",
    "Total Bs",
    "Total $",
    "Deuda $",
    "Acciones",
  ];

  const [data, setData] = useState([
    {
      ID: 1,
      Fecha: "2022-01-01",
      UT: "UT1",
      Eje: "Eje1",
      "Sub-eje": "Sub-eje1",
      "NDE(a)": "NDE1",
      FacProv: "FacProv1",
      Proveedor: "Proveedor1",
      Compromiso: "Compromiso1",
      Repuesto: "Repuesto1",
      Cantidad: 10,
      "Total Bs": 100,
      "Total $": 50,
      "Deuda $": 25,
    },
    {
      ID: 2,
      Fecha: "2022-02-01",
      UT: "UT2",
      Eje: "Eje2",
      "Sub-eje": "Sub-eje2",
      "NDE(a)": "NDE2",
      FacProv: "FacProv2",
      Proveedor: "Proveedor2",
      Compromiso: "Compromiso2",
      Repuesto: "Repuesto2",
      Cantidad: 20,
      "Total Bs": 200,
      "Total $": 100,
      "Deuda $": 50,
    },
    {
      ID: 3,
      Fecha: "2022-03-01",
      UT: "UT3",
      Eje: "Eje3",
      "Sub-eje": "Sub-eje3",
      "NDE(a)": "NDE3",
      FacProv: "FacProv3",
      Proveedor: "Proveedor3",
      Compromiso: "Compromiso3",
      Repuesto: "Repuesto3",
      Cantidad: 30,
      "Total Bs": 300,
      "Total $": 150,
      "Deuda $": 75,
    },
  ]);

  const [filters, setFilters] = useState({});

  // ...
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
  // ...

  const [dateRange, setDateRange] = React.useState([new Date(0), new Date()]);
  const filteredRows = data.filter((row: any) => {
    const date = new Date(row.Fecha);
    return date >= new Date(dateRange[0]) && date <= new Date(dateRange[1]);
  });
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

  const startDate = new Date(dateRange[0]);
  const endDate = new Date(dateRange[1]);

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
            .map((row) => (
              <TableRowData key={row.ID} row={row} headers={headers} />
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
