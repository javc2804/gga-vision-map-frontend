import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Grid } from "@mui/material";

const schema = yup.object().shape({
  precioUnitarioBs: yup
    .string()
    .required("El precio unitario en Bs es requerido")
    .test(
      "not-start-with-decimal-point",
      "El número no puede comenzar con un punto decimal",
      (value) => !value.startsWith(".")
    )
    .test(
      "not-start-with-zero",
      "El número no puede comenzar con cero a menos que sea decimal",
      (value) => !value.startsWith("0") || value.startsWith("0.")
    )
    .test(
      "no-trailing-decimal-point",
      "No puede terminar con un punto decimal sin especificar los decimales",
      (value) => !value.endsWith(".")
    )
    .test(
      "is-number",
      "El campo solo admite números",
      (value) => !isNaN(Number(value))
    )
    .test(
      "is-positive",
      "El precio unitario en Bs debe ser un número positivo",
      (value) => Number(value) > 0
    ),
  precioUnitarioUsd: yup
    .string()
    .required("El precio unitario en $ es requerido")
    .test(
      "not-start-with-decimal-point",
      "El número no puede comenzar con un punto decimal",
      (value) => !value.startsWith(".")
    )
    .test(
      "not-start-with-zero",
      "El número no puede comenzar con cero a menos que sea decimal",
      (value) => !value.startsWith("0") || value.startsWith("0.")
    )
    .test(
      "no-trailing-decimal-point",
      "No puede terminar con un punto decimal sin especificar los decimales",
      (value) => !value.endsWith(".")
    )
    .test(
      "is-number",
      "El campo solo admite números",
      (value) => !isNaN(Number(value))
    )
    .test(
      "is-positive",
      "El precio unitario en $ debe ser un número positivo",
      (value) => Number(value) > 0
    ),
  cantidad: yup
    .string()
    .required("La cantidad es requerida")
    .test(
      "is-number",
      "La cantidad debe ser un número entero",
      (value) => !isNaN(Number(value)) && Number.isInteger(Number(value))
    )
    .test(
      "is-positive",
      "La cantidad debe ser un número positivo",
      (value) => Number(value) > 0
    )
    .test(
      "no-decimal-point",
      "La cantidad no puede contener un punto decimal",
      (value) => !value.includes(".")
    ),
  tasaBcv: yup
    .string()
    .required("La tasa Bcv es requerida")
    .test(
      "not-start-with-decimal-point",
      "El número no puede comenzar con un punto decimal",
      (value) => !value.startsWith(".")
    )
    .test(
      "not-start-with-zero",
      "El número no puede comenzar con cero a menos que sea decimal",
      (value) => !value.startsWith("0") || value.startsWith("0.")
    )
    .test(
      "no-trailing-decimal-point",
      "No puede terminar con un punto decimal sin especificar los decimales",
      (value) => !value.endsWith(".")
    )
    .test(
      "is-number",
      "El campo solo admite números",
      (value) => !isNaN(Number(value))
    )
    .test(
      "is-positive",
      "La tasa Bcv debe ser un número positivo",
      (value) => Number(value) > 0
    ),
  montoTotalUsd: yup
    .string()
    .required("El monto total $ es requerida")
    .test(
      "not-start-with-decimal-point",
      "El número no puede comenzar con un punto decimal",
      (value) => !value.startsWith(".")
    )
    .test(
      "not-start-with-zero",
      "El número no puede comenzar con cero a menos que sea decimal",
      (value) => !value.startsWith("0") || value.startsWith("0.")
    )
    .test(
      "no-trailing-decimal-point",
      "No puede terminar con un punto decimal sin especificar los decimales",
      (value) => !value.endsWith(".")
    )
    .test(
      "is-number",
      "El campo solo admite números",
      (value) => !isNaN(Number(value))
    )
    .test(
      "is-positive",
      "El monto total $ debe ser un número positivo",
      (value) => Number(value) > 0
    ),
  montoTotalBs: yup
    .string()
    .required("El monto total Bs es requerida")
    .test(
      "not-start-with-decimal-point",
      "El número no puede comenzar con un punto decimal",
      (value) => !value.startsWith(".")
    )
    .test(
      "not-start-with-zero",
      "El número no puede comenzar con cero a menos que sea decimal",
      (value) => !value.startsWith("0") || value.startsWith("0.")
    )
    .test(
      "no-trailing-decimal-point",
      "No puede terminar con un punto decimal sin especificar los decimales",
      (value) => !value.endsWith(".")
    )
    .test(
      "is-number",
      "El campo solo admite números",
      (value) => !isNaN(Number(value))
    )
    .test(
      "is-positive",
      "El monto total Bs debe ser un número positivo",
      (value) => Number(value) > 0
    ),
  ocOs: yup
    .number()
    .typeError("OC/OS debe ser un número entero")
    .integer("OC/OS debe ser un número entero")
    .required("OC/OS es requerido"),
  ordenPago: yup
    .number()
    .typeError("N de Orden de Pago debe ser un número entero")
    .integer("N de Orden de Pago debe ser un número entero")
    .required("N de Orden de Pago es requerido"),
  fechaOcOs: yup.date().required("Fecha de OC/OS es requerido"),
});

export const PaymentForm = ({ initialValues, onChange }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const [values, setValues] = useState(initialValues);
  const repuestos = [
    { title: "Repuesto 1" },
    { title: "Repuesto 2" },
    // Agrega aquí más repuestos si los necesitas
  ];

  const descripcionRepuesto = [
    { title: "Descripción 1" },
    { title: "Descripción 2" },
    // Agrega aquí más descripciones si las necesitas
  ];

  useEffect(() => {
    if (typeof onChange === "function") {
      if (JSON.stringify(values) !== JSON.stringify(initialValues)) {
        onChange(values);
      }
    }
  }, [values, onChange, initialValues]);

  const onSubmit = (data) => {
    if (typeof onChange === "function") {
      onChange(data, errors);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} sx={{}}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          "& > :not(style)": { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={2} style={{ width: "40%" }}>
          {" "}
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="repuesto"
              control={control}
              rules={{ required: "Repuesto es requerido" }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={repuestos}
                  getOptionLabel={(option) => (option ? option.title : "")}
                  isOptionEqualToValue={(option, value) =>
                    option.title === value.title
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Repuesto"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                  onChange={(_, data) => field.onChange(data)}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="descripcionRepuesto"
              control={control}
              rules={{ required: "Descripción repuesto es requerido" }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={descripcionRepuesto}
                  getOptionLabel={(option) => (option ? option.title : "")}
                  isOptionEqualToValue={(option, value) =>
                    option.title === value.title
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Descripción Repuesto"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                  onChange={(_, data) => field.onChange(data)}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Controller
              name="formaDePago"
              control={control}
              rules={{ required: "Forma de pago es requerido" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Contado"
                  variant="outlined"
                  fullWidth
                  defaultValue="Contado"
                  disabled
                />
              )}
            />
          </Grid>
        </Grid>

        <Controller
          name="descripcion"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Descripción"
              variant="outlined"
              error={!!errors.descripcion}
              helperText={errors.descripcion?.message}
              onChange={(event) => {
                field.onChange(event); // update field value
                trigger("descripcion"); // validate field
                setValues({ ...values, descripcion: event.target.value }); // update local state
              }}
            />
          )}
        />
        <Controller
          name="cantidad"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Cantidad"
              variant="outlined"
              error={!!errors.cantidad}
              helperText={errors.cantidad?.message}
              onChange={(event) => {
                field.onChange(event); // update field value
                trigger("cantidad"); // validate field
                setValues({ ...values, cantidad: event.target.value }); // update local state
              }}
            />
          )}
        />
        <Controller
          name="precioUnitarioBs"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Precio Unitario Bs"
              variant="outlined"
              error={!!errors.precioUnitarioBs}
              helperText={errors.precioUnitarioBs?.message}
              onChange={(event) => {
                field.onChange(event); // update field value
                trigger("precioUnitarioBs"); // validate field
                setValues({ ...values, precioUnitarioBs: event.target.value }); // update local state
              }}
            />
          )}
        />
        <Controller
          name="tasaBcv"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Tasa BCV"
              variant="outlined"
              error={!!errors.tasaBcv}
              helperText={errors.tasaBcv?.message}
              onChange={(event) => {
                field.onChange(event);
                trigger("tasaBcv");
                setValues({ ...values, tasaBcv: event.target.value }); // update local state
              }}
            />
          )}
        />
        <Controller
          name="precioUnitarioUsd"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Precio Unitario $"
              variant="outlined"
              error={!!errors.precioUnitarioUsd}
              helperText={errors.precioUnitarioUsd?.message}
              onChange={(event) => {
                field.onChange(event); // update field value
                trigger("precioUnitarioUsd"); // validate field
                setValues({
                  ...values,
                  precioUnitarioUsd: event.target.value,
                }); // update local state
              }}
            />
          )}
        />
        <Controller
          name="montoTotalBs"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Monto total Bs"
              variant="outlined"
              error={!!errors.montoTotalBs}
              helperText={errors.montoTotalBs?.message}
              onChange={(event) => {
                field.onChange(event); // update field value
                trigger("montoTotalBs"); // validate field
                setValues({
                  ...values,
                  montoTotalBs: event.target.value,
                }); // update local state
              }}
            />
          )}
        />
        <Controller
          name="montoTotalUsd"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Monto total $"
              variant="outlined"
              error={!!errors.montoTotalUsd}
              helperText={errors.montoTotalUsd?.message}
              onChange={(event) => {
                field.onChange(event); // update field value
                trigger("montoTotalUsd"); // validate field
                setValues({
                  ...values,
                  montoTotalUsd: event.target.value,
                }); // update local state
              }}
            />
          )}
        />
        <Controller
          name="ocOs"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="OC/OS"
              variant="outlined"
              error={!!errors.ocOs}
              helperText={errors.ocOs?.message}
            />
          )}
        />
        <Controller
          name="fechaOcOs"
          control={control}
          rules={{ required: "Fecha de OC/OS es requerido" }}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              id="fechaOcOs"
              label="Fecha OC/OS"
              value={value}
              onChange={onChange}
              format="dd/MM/yyyy"
              components={{
                textField: TextField,
              }}
              error={!!errors.fechaOcOs}
              helperText={errors.fechaOcOs?.message}
            />
          )}
        />
        <Controller
          name="ordenPago"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="N de Orden de Pago"
              variant="outlined"
              error={!!errors.ordenPago}
              helperText={errors.ordenPago?.message}
            />
          )}
        />
        <Controller
          name="observacion"
          control={control}
          rules={{ required: "Observación es requerido" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Observación"
              variant="outlined"
              multiline
              rows={4}
              error={!!errors.observacion}
              helperText={errors.observacion?.message}
            />
          )}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default PaymentForm;
