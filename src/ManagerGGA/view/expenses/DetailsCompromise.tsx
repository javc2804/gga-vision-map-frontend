import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startSavePurchase,
  startGetPurchaseTrans,
} from "../../../store/purchase/purchaseThunks";

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Grid,
  Button,
  Divider,
  Box,
  useMediaQuery,
  useTheme,
  Snackbar,
  Alert,
  Paper,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import UTData from "../../components/detailsCompromise/UTData";
import CostData from "../../components/detailsCompromise/CostData";
import ViewCompromise from "../../components/registerCompromise/PayCompromise/viewCompromise/ViewCompromise";

const DetailsCompromise = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const invoice = location.state.invoice;
  useEffect(() => {
    dispatch(startGetPurchaseTrans(invoice.note_number));
  }, []);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [snackbarType, setSnackbarType] = useState("");
  const [costData, setCostData] = useState(
    invoice.invoices.map(() => ({
      precioUnitarioDivisas: "",
      montoTotalPagoBolivares: "",
      montoTotalDivisasDeuda: "",
      precioUnitarioDivisasS: "",
      montoTotalPagoDivisas: "",
      fechaEntrega: "",
      fechaPago: "",
      ordenPagoNumero: "",
      ordenCompraServicio: "",
      ordenCompraServicioFecha: "",
      notaEntregaNumero: "",
      estatus: "",
      observacion: "",
    }))
  );

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleCostDataChange = (index, newCostData) => {
    setCostData(costData.map((item, i) => (i === index ? newCostData : item)));
  };

  const handleSave = () => {
    for (let i = 0; i < costData.length; i++) {
      for (let field in costData[i]) {
        if (!costData[i][field]) {
          setSnackbarMessage(
            `El campo ${field} está vacío en la factura ${
              i + 1
            }. Por favor, rellénelo antes de guardar.`
          );
          setSnackbarType("error");
          setSnackbarOpen(true);
          return;
        }
      }
    }

    const updatedInvoices = invoice.invoices.map((inv, index) => ({
      ...inv,
      ...costData[index],
    }));

    const updatedInvoice = { ...invoice, invoices: updatedInvoices };

    dispatch(startSavePurchase(updatedInvoice))
      .then(() => {
        setSnackbarMessage("Guardado con éxito");
        setSnackbarType("success");
        setSnackbarOpen(true);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch(() => {
        setSnackbarMessage("No se logró guardar");
        setSnackbarType("error");
        setSnackbarOpen(true);
      });
  };

  const resp = useSelector((state: any) => state.compromises);
  const { compromise } = resp;

  return (
    <>
      <ViewCompromise compromise={compromise.response} />

      <Box style={{ overflow: "auto", maxHeight: "90vh" }}>
        <Grid container direction="column">
          <Grid item>
            <Paper
              elevation={3}
              style={{ width: "97%", marginLeft: "1%", marginBottom: "20px" }}
            >
              <Grid
                container
                spacing={2}
                direction={matches ? "column" : "row"}
              >
                {invoice.invoices.map((invoiceData, index) => (
                  <React.Fragment key={index}>
                    <Grid item xs={12} sm={6}>
                      <Box height="100%" style={{ marginLeft: "1%" }}>
                        <UTData
                          {...invoiceData}
                          style={{ width: "97%", height: "540px" }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box height="100%">
                        <CostData
                          invoiceData={costData[index]}
                          onValuesChange={(newCostData) =>
                            handleCostDataChange(index, newCostData)
                          }
                          style={{ width: "97%", height: "525px" }}
                        />
                      </Box>
                    </Grid>
                    {index < invoice.invoices.length - 1 && (
                      <Divider style={{ width: "100%", margin: "1% 0" }} />
                    )}
                  </React.Fragment>
                ))}
              </Grid>
            </Paper>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Guardar
            </Button>
          </Grid>
        </Grid>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            severity={snackbarType}
            icon={
              snackbarType === "success" ? <CheckCircleIcon /> : <ErrorIcon />
            }
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default DetailsCompromise;
