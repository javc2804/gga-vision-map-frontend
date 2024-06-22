import { TextField, Grid, Button } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { startCreateOutInternal } from "../../store/out-internal/outInternalThunk";

const RegisterOutInternal = () => {
  const [formValues, setFormValues] = useState({});
  const dispatch = useDispatch();
  const handleChange = (e, field) => {
    setFormValues({ ...formValues, [field.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(startCreateOutInternal(formValues));
  };

  const fields = [
    {
      label: "Proveedor/Beneficiario",
      name: "proveedor_beneficiario",
      type: "string",
    },
    {
      label: "Mantenimiento Adquisición",
      name: "mantenimiento_adquisicion",
      type: "number",
    },
    {
      label: "Monto Factura Bolivares Adq. Mantenimiento",
      name: "monto_factura_bs_mantenimiento",
      type: "number",
    },
    {
      label: "Monto Pagado Bolivares adq. Mantenimiento",
      name: "monto_pagado_bolivares_mantenimiento",
      type: "number",
    },
    {
      label: "Monto Factura $$ Adq. Mantenimiento",
      name: "monto_factura_dolares_mantenimiento",
      type: "number",
    },
    {
      label: "Monto pagado $$ Adq. Mantenimiento",
      name: "monto_pagado_dolares_mantenimiento",
      type: "number",
    },
    {
      label: "Beneficiario Gasto de personal",
      name: "beneficiario_gasto_personal",
      type: "text",
    },
    { label: "Gasto de Personal", name: "gasto_personal", type: "text" },
    {
      label: "Monto Pagado Bs Gasto de Personal",
      name: "monto_pagado_bs_personal",
      type: "number",
    },
    {
      label: "Monto Pagado $$ Gasto de Personal",
      name: "monto_pagado_dolares_personal",
      type: "number",
    },
    {
      label: "Beneficiario Donaciones",
      name: "beneficiario_donaciones",
      type: "text",
    },
    { label: "Donaciones", name: "donaciones", type: "text" },
    {
      label: "Monto Pagado Bolivares Donaciones",
      name: "monto_pagado_bolivares_donaciones",
      type: "number",
    },
    {
      label: "Monto Pagado $$ Donaciones",
      name: "monto_pagado_dolares_donaciones",
      type: "number",
    },
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
    { label: "Aportes", name: "aportes", type: "number" },
    {
      label: "Monto pagado Bs Aportes",
      name: "monto_pagado_bs_aportes",
      type: "number",
    },
    {
      label: "Monto Pagado $ Aportes",
      name: "monto_pagado_dolares_aportes",
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
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Guardar
      </Button>
    </>
  );
};

export default RegisterOutInternal;
