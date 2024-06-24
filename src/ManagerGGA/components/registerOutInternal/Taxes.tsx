import { TextField, Grid, Button, Paper } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { startCreateOutInternal } from "../../../store/out-internal/outInternalThunk";

export const Taxes = () => {
  const [formValues, setFormValues] = useState({});
  const dispatch = useDispatch();
  const handleChange = (e: any, field: any) => {
    setFormValues({ ...formValues, [field.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(startCreateOutInternal(formValues));
  };

  const fields = [
    { label: "Impuestos", name: "impuestos", type: "number" },
    {
      label: "Monto Pagado Bolivares Impuesto",
      name: "monto_pagado_bolivares_impuesto",
      type: "number",
    },
    {
      label: "Monto pagado $ Impuesto",
      name: "monto_pagado_dolares_impuesto",
      type: "number",
    },
    { label: "Num Factura", name: "num_factura", type: "number" },
    { label: "Fecha Factura", name: "fecha_factura", type: "date" },
    { label: "Num de referencia", name: "num_referencia", type: "number" },
    { label: "Cuenta Bancaria", name: "cuenta_bancaria", type: "text" },
    { label: "Tasa BCV", name: "tasa_bcv", type: "number" },
    { label: "Fecha de la tasa", name: "fecha_tasa", type: "date" },
    { label: "Num de orden de Pago", name: "num_orden_pago", type: "number" },
    { label: "Fecha de Pago", name: "fecha_pago", type: "date" },
    { label: "Relacion mes de pago", name: "relacion_mes_pago", type: "text" },
    { label: "Observacion", name: "observacion", type: "text" },
  ];

  return (
    <>
      <Paper
        elevation={3}
        style={{
          padding: "20px",
          marginTop: "3%",
          borderRadius: "15px",
          backgroundColor: "white",
        }}
      >
        <Grid container spacing={2} padding={2}>
          {fields.map((field, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <TextField
                fullWidth
                label={field.label}
                variant="outlined"
                type={field.type}
                name={field.name}
                onChange={(e) => handleChange(e, field)}
              />
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12} container justifyContent="flex-end">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Guardar
          </Button>
        </Grid>
      </Paper>
    </>
  );
};

export default Taxes;
