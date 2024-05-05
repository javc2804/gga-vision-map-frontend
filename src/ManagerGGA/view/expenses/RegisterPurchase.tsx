import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Grid,
  Button,
  Divider,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import UTData from "../../components/UTData";
import CostData from "../../components/CostData";

const RegisterPurchase = () => {
  const location = useLocation();
  const invoice = location.state.invoice;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

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

  const handleCostDataChange = (index, newCostData) => {
    setCostData(costData.map((item, i) => (i === index ? newCostData : item)));
  };

  const handleSave = () => {
    const updatedInvoices = invoice.invoices.map((inv, index) => ({
      ...inv,
      ...costData[index],
    }));

    const updatedInvoice = { ...invoice, invoices: updatedInvoices };

    console.log(JSON.stringify({ invoice: updatedInvoice.invoices }, null, 2));
  };

  return (
    <Box style={{ overflow: "auto", maxHeight: "90vh" }}>
      <Grid container direction="column">
        <Grid item>
          <Grid container spacing={2} direction={matches ? "column" : "row"}>
            {invoice.invoices.map((invoiceData, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12} sm={6}>
                  <Box height="100%">
                    <UTData
                      {...invoiceData}
                      style={{ width: "97%", height: "500px" }}
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
                      style={{ width: "97%", height: "500px" }}
                    />
                  </Box>
                </Grid>
                {index < invoice.invoices.length - 1 && (
                  <Divider style={{ width: "100%", margin: "5% 0" }} />
                )}
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Guardar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegisterPurchase;
