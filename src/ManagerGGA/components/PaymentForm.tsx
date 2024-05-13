import { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

export const PaymentForm = ({ initialValues, onChange }) => {
  const [values, setValues] = useState({
    ...initialValues,
    repuestos: initialValues.repuestos ? initialValues.repuestos : null,
    descripcionRepuesto: initialValues.descripcionRepuesto
      ? initialValues.descripcionRepuesto
      : null,
    fechaOcOs: initialValues.fechaOcOs ? initialValues.fechaOcOs : null,
  });

  const handleChange = (event) => {
    const newValues = {
      ...values,
      [event.target.id]: event.target.value,
    };
    setValues(newValues);
    if (onChange) {
      onChange(newValues);
    }
  };

  const handleAutoCompleteChange = (field) => (event, newValue) => {
    const newValues = {
      ...values,
      [field]: newValue,
    };
    setValues(newValues);
    if (onChange) {
      onChange(newValues);
    }
  };

  const handleDateChange = (newValue) => {
    const newValues = {
      ...values,
      fechaOcOs: newValue,
    };
    setValues(newValues);
    if (onChange) {
      onChange(newValues);
    }
  };

  const repuestosOptions = ["Cauchos", "Filtros"];
  const descripcionRepuestoOptions = ["Descripción 1", "Descripción 2"];

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Autocomplete
          id="repuestos"
          options={repuestosOptions}
          value={values.repuestos}
          onChange={handleAutoCompleteChange}
          renderInput={(params) => (
            <TextField {...params} label="Repuestos" variant="outlined" />
          )}
        />
        <Autocomplete
          id="descripcionRepuesto"
          options={descripcionRepuestoOptions}
          value={values.descripcionRepuesto}
          onChange={handleAutoCompleteChange("descripcionRepuesto")}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Descripción Repuesto"
              variant="outlined"
            />
          )}
        />
        <TextField
          id="formaPago"
          label="Forma de pago"
          variant="outlined"
          value={values.formaPago}
          onChange={handleChange}
        />
        <TextField
          id="descripcion"
          label="Descripción"
          variant="outlined"
          value={values.descripcion}
          onChange={handleChange}
        />
        <TextField
          id="cantidad"
          label="Cantidad"
          variant="outlined"
          value={values.cantidad}
          onChange={handleChange}
        />
        <TextField
          id="precioUnitarioBs"
          label="Precio unitario en Bs"
          variant="outlined"
          value={values.precioUnitarioBs}
          onChange={handleChange}
        />
        <TextField
          id="tasaBcv"
          label="Tasa BCV"
          variant="outlined"
          value={values.tasaBcv}
          onChange={handleChange}
        />
        <TextField
          id="precioUnitarioDolares"
          label="Precio Unitario en $"
          variant="outlined"
          value={values.precioUnitarioDolares}
          onChange={handleChange}
        />
        <TextField
          id="montoTotalDolares"
          label="Monto Total del pago en $"
          variant="outlined"
          value={values.montoTotalDolares}
          onChange={handleChange}
        />
        <TextField
          id="montoTotalBs"
          label="Monto total del pago en Bs"
          variant="outlined"
          value={values.montoTotalBs}
          onChange={handleChange}
        />
        <TextField
          id="ocOs"
          label="OC/OS"
          variant="outlined"
          value={values.ocOs}
          onChange={handleChange}
        />
        <DatePicker
          id="fechaOcOs"
          label="Fecha OC/OS"
          value={values.fechaOcOs}
          onChange={handleDateChange}
          format="dd/MM/yyyy"
          components={{
            textField: TextField,
          }}
        />
        <TextField
          id="numeroOrdenPago"
          label="Número de orden de pago"
          variant="outlined"
          value={values.numeroOrdenPago}
          onChange={handleChange}
        />
        <TextField
          id="observacion"
          label="Observación"
          variant="outlined"
          value={values.observacion}
          onChange={handleChange}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default PaymentForm;
