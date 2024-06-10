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
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
// import Icon from "@mui/material/Icon";
// import { he } from "date-fns/locale";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

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
  const boxStyle = {
    padding: "10px",
    margin: "10px",
    backgroundColor: "white",
    width: "15%",
    height: "200px", // Cambia la altura a 500px
    marginBottom: "5%",
  };
  // const iconButtonStyle = {
  //   color: "white",
  //   position: "absolute",
  //   left: 0,
  //   top: -60,
  //   width: "120px",
  //   height: 100,
  //   backgroundColor: "#ffa523",
  //   borderRadius: 0,
  //   boxShadow: "3px 3px 5px 0px rgba(0,0,0,0.75)",
  // };

  const iconButtonStyle1 = {
    backgroundColor: "#ffa523",
    color: "white",
    position: "absolute" as "absolute",
    left: 0,
    top: -60,
    width: "120px",
    height: 100,
    borderRadius: 0,
    boxShadow: "3px 3px 5px 0px rgba(0,0,0,0.75)",
  };

  const iconButtonStyle2 = {
    backgroundColor: "#4ca750",
    color: "white",
    position: "absolute" as "absolute",
    left: 0,
    top: -60,
    width: "120px",
    height: 100,
    borderRadius: 0,
    boxShadow: "3px 3px 5px 0px rgba(0,0,0,0.75)",
  };

  const iconButtonStyle3 = {
    backgroundColor: "#13b9cd",
    color: "white",
    position: "absolute" as "absolute",
    left: 0,
    top: -60,
    width: "120px",
    height: 100,
    borderRadius: 0,
    boxShadow: "3px 3px 5px 0px rgba(0,0,0,0.75)",
  };

  const iconButtonStyle4 = {
    backgroundColor: "#ea4541",
    color: "white",
    position: "absolute" as "absolute",
    left: 0,
    top: -60,
    width: "120px",
    height: 100,
    borderRadius: 0,
    boxShadow: "3px 3px 5px 0px rgba(0,0,0,0.75)",
  };
  const headers = [
    "id",
    "createdAt",
    // "facNDE",
    // "proveedor",
    "ut",
    // "marcaModelo",
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
    "deudaTotalUsd",
    // "tasaBcv",
    // "fechaOcOs",
    // "numeroOrdenPago",
    // "observacion",
    // "ocOs",
    // "precioUnitarioBs",
    // "precioUnitarioUsd",
    // "updatedAt",
    // "user_rel",
    "Acciones",
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

  const { data, filters, updateFilter } = usePurchaseList(page, rowsPerPage);
  let tempData = data;
  if (!tempData) {
    console.error("data es undefined o null");
    tempData = { rows: [] };
  } else if (!tempData.rows || !Array.isArray(tempData.rows)) {
    console.error("data.rows no es un array:", tempData.rows);
    tempData.rows = [];
  }
  // const [pageSize, setPageSize] = useState(5); // puedes cambiar 10 a cualquier valor inicial que desees
  const loading = useSelector((state: any) => state.purchase.loading);
  const summary = useSelector((state: any) => state.purchase.summary);

  const { totalMontoBs, totalDeuda, totalCantidad, totalMontoUsd } = summary;

  const currentYear = new Date().getFullYear();
  const [dateRange, setDateRange] = useState([
    new Date(currentYear, 0, 1),
    new Date(),
  ]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <TableContainer component={Paper}>
          <h2>Registro de transacciones</h2>
          <Box display="flex" justifyContent="center" flexWrap="wrap">
            <Paper elevation={3} style={boxStyle}>
              <Box position="relative">
                <IconButton style={iconButtonStyle1}>
                  <InsertChartOutlinedIcon style={{ fontSize: 60 }} />
                </IconButton>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                height="100%" // Asegúrate de que la caja ocupe toda la altura disponible
              >
                <h1>Cantidad</h1>
                <h1>
                  {totalCantidad
                    ? totalCantidad.toLocaleString("de-DE", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : "0.00"}
                </h1>
              </Box>
            </Paper>
            <Paper elevation={3} style={boxStyle}>
              <Box position="relative">
                <IconButton style={iconButtonStyle2}>
                  <MoneyOffIcon style={{ fontSize: 60 }} />
                </IconButton>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                height="100%" // Asegúrate de que la caja ocupe toda la altura disponible
              >
                <h1>Monto total Bs</h1>
                <h1>
                  {totalMontoBs
                    ? totalMontoBs.toLocaleString("de-DE", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : "0.00"}
                </h1>
              </Box>
            </Paper>
            <Paper elevation={3} style={boxStyle}>
              <Box position="relative">
                <IconButton style={iconButtonStyle3}>
                  <AttachMoneyIcon style={{ fontSize: 60 }} />
                </IconButton>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                height="100%" // Asegúrate de que la caja ocupe toda la altura disponible
              >
                <h1>Monto Total $</h1>
                <h1>
                  {totalMontoUsd
                    ? totalMontoUsd.toLocaleString("de-DE", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : "0.00"}
                </h1>
              </Box>
            </Paper>
            <Paper elevation={3} style={boxStyle}>
              <Box position="relative">
                <IconButton style={iconButtonStyle4}>
                  <AccountBalanceIcon style={{ fontSize: 60 }} />
                </IconButton>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                height="100%" // Asegúrate de que la caja ocupe toda la altura disponible
              >
                <h1>Deuda Total $</h1>
                <h1>
                  {totalDeuda
                    ? totalDeuda.toLocaleString("de-DE", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : "0.00"}
                </h1>
              </Box>
            </Paper>
          </Box>
          <Filters
            headers={headers}
            filters={filters}
            dateRange={dateRange}
            setDateRange={setDateRange}
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
                {data &&
                  data.rows &&
                  data.rows.map((row) => (
                    <TableRowData key={row.id} row={row} headers={headers} />
                  ))}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.count || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Filas por página" // Cambia "Rows per page" a "Filas por página"
          />
        </TableContainer>
      )}
    </>
  );
};

export default ListPurchase;
