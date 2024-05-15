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
  numeroOrdenPago: yup
    .number()
    .typeError("N de Orden de Pago debe ser un número entero")
    .integer("N de Orden de Pago debe ser un número entero")
    .required("N de Orden de Pago es requerido"),
  fechaOcOs: yup.date().required("Fecha de OC/OS es requerido"),
});

export const PaymentForm = ({
  initialValues,
  spareParts,
  sparePartVariants,
  onChange,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const [values, setValues] = useState(initialValues);

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

  const calculatePrecioUnitarioUsd = (
    precioUnitarioBs: string,
    tasaBcv: string
  ) => {
    const precioBs = parseFloat(precioUnitarioBs);
    const tasa = parseFloat(tasaBcv);

    if (!isNaN(precioBs) && !isNaN(tasa) && tasa !== 0) {
      const result = precioBs / tasa;
      return result.toFixed(2); // round to 2 decimal places
    }

    return "";
  };

  const calculatePrecioUnitarioBs = (
    montoTotalBs: number,
    cantidad: number
  ) => {
    if (isNaN(montoTotalBs) || isNaN(cantidad) || cantidad === 0) {
      return 0;
    }
    return montoTotalBs / cantidad;
  };

  const calculateMontoTotalBs = (
    cantidad: string,
    precioUnitarioBs: string
  ) => {
    const cantidadNum = parseFloat(cantidad);
    const precioBs = parseFloat(precioUnitarioBs);

    if (!isNaN(cantidadNum) && !isNaN(precioBs)) {
      const result = cantidadNum * precioBs;
      return result.toFixed(2); // round to 2 decimal places
    }

    return "";
  };

  const calculateMontoTotalUsd = (
    cantidad: string,
    precioUnitarioUsd: string
  ) => {
    const cantidadNum = parseFloat(cantidad);
    const precioUsd = parseFloat(precioUnitarioUsd);

    if (!isNaN(cantidadNum) && !isNaN(precioUsd)) {
      const result = cantidadNum * precioUsd;
      return result.toFixed(2); // round to 2 decimal places
    }

    return "";
  };

  const calculateTasaBcv = (
    precioUnitarioBs: number,
    precioUnitarioUsd: number
  ) => {
    const epsilon = 0.0001; // or some small value
    if (
      isNaN(precioUnitarioBs) ||
      isNaN(precioUnitarioUsd) ||
      Math.abs(precioUnitarioUsd) < epsilon
    ) {
      return 0;
    }

    return (precioUnitarioBs / precioUnitarioUsd).toFixed(2);
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
                  options={spareParts}
                  getOptionLabel={(option) => (option ? option.type : "")}
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
                  options={sparePartVariants}
                  getOptionLabel={(option) => (option ? option.variant : "")}
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
                const newCantidad = event.target.value;
                const newMontoTotalBs = calculateMontoTotalBs(
                  newCantidad,
                  values.precioUnitarioBs
                );
                const newMontoTotalUsd = calculateMontoTotalUsd(
                  newCantidad,
                  values.precioUnitarioUsd
                );
                setValues({
                  ...values,
                  cantidad: newCantidad,
                  montoTotalBs: newMontoTotalBs,
                  montoTotalUsd: newMontoTotalUsd,
                });
                setValue("montoTotalBs", newMontoTotalBs); // update montoTotalBs field
                setValue("montoTotalUsd", newMontoTotalUsd); // update montoTotalUsd field
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
                field.onChange(event);
                trigger("precioUnitarioBs");
                const newPrecioUnitarioBs = event.target.value;
                const newPrecioUnitarioUsd = calculatePrecioUnitarioUsd(
                  newPrecioUnitarioBs,
                  values.tasaBcv
                );
                const newMontoTotalBs = calculateMontoTotalBs(
                  values.cantidad,
                  newPrecioUnitarioBs
                );
                const newMontoTotalUsd = calculateMontoTotalUsd(
                  values.cantidad,
                  newPrecioUnitarioUsd
                );
                setValues({
                  ...values,
                  precioUnitarioBs: newPrecioUnitarioBs,
                  precioUnitarioUsd: newPrecioUnitarioUsd,
                  montoTotalBs: newMontoTotalBs,
                  montoTotalUsd: newMontoTotalUsd,
                });
                setValue("precioUnitarioUsd", newPrecioUnitarioUsd); // update precioUnitarioUsd field
                setValue("montoTotalBs", newMontoTotalBs); // update montoTotalBs field
                setValue("montoTotalUsd", newMontoTotalUsd); // update montoTotalUsd field
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
                const newTasaBcv = event.target.value;
                const newPrecioUnitarioUsd = calculatePrecioUnitarioUsd(
                  values.precioUnitarioBs,
                  newTasaBcv
                );
                setValues({
                  ...values,
                  tasaBcv: newTasaBcv,
                  precioUnitarioUsd: newPrecioUnitarioUsd,
                });
                setValue("precioUnitarioUsd", newPrecioUnitarioUsd); // update precioUnitarioUsd field
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
              label="Precio unitario $"
              variant="outlined"
              error={!!errors.precioUnitarioUsd}
              helperText={errors.precioUnitarioUsd?.message}
              onChange={(event) => {
                field.onChange(event); // update field value
                trigger("precioUnitarioUsd"); // validate field
                const newPrecioUnitarioUsd = event.target.value;
                const newPrecioUnitarioBs =
                  values.tasaBcv * newPrecioUnitarioUsd;
                setValues({
                  ...values,
                  precioUnitarioUsd: newPrecioUnitarioUsd,
                  precioUnitarioBs: newPrecioUnitarioBs,
                }); // update local state
                setValue("precioUnitarioBs", newPrecioUnitarioBs); // update precioUnitarioBs field
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
                const newMontoTotalBs = event.target.value;
                const newPrecioUnitarioBs = calculatePrecioUnitarioBs(
                  newMontoTotalBs,
                  values.cantidad
                );
                const newTasaBcv = calculateTasaBcv(
                  newPrecioUnitarioBs,
                  values.precioUnitarioUsd
                );
                setValues({
                  ...values,
                  montoTotalBs: newMontoTotalBs,
                  precioUnitarioBs: newPrecioUnitarioBs,
                  tasaBcv: newTasaBcv,
                }); // update local state
                setValue("precioUnitarioBs", newPrecioUnitarioBs); // update precioUnitarioBs field
                setValue("tasaBcv", newTasaBcv); // update tasaBcv field
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
                const newMontoTotalUsd = event.target.value;
                const newPrecioUnitarioUsd = calculatePrecioUnitarioUsd(
                  newMontoTotalUsd,
                  values.cantidad
                );
                const newTasaBcv = calculateTasaBcv(
                  values.precioUnitarioBs,
                  newPrecioUnitarioUsd
                );
                setValues({
                  ...values,
                  montoTotalUsd: newMontoTotalUsd,
                  precioUnitarioUsd: newPrecioUnitarioUsd,
                  tasaBcv: newTasaBcv,
                }); // update local state
                setValue("precioUnitarioUsd", newPrecioUnitarioUsd); // update precioUnitarioUsd field
                setValue("tasaBcv", newTasaBcv); // update tasaBcv field
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
          name="numeroOrdenPago"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nº de Orden de Pago"
              variant="outlined"
              error={!!errors.numeroOrdenPago}
              helperText={errors.numeroOrdenPago?.message}
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
