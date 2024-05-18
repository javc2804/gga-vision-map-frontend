import { useEffect, useRef, useState } from "react";
import { TextField, Box, Grid, Autocomplete } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import { schema } from "../../helpers/validationsPaymentForm";
import { useCalculations } from "../hooks/useCalculations";
import SparePartsFormPay from "../components/SparePartsAndDescriptions";

interface PaymentFormProps {
  initialValues: any;
  spareParts: any;
  sparePartVariants: any;
  onChange: any;
}

export const PaymentForm = ({
  initialValues,
  spareParts,
  sparePartVariants,
  onChange,
}: PaymentFormProps) => {
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

  const {
    calculatePrecioUnitarioUsd,
    calculatePrecioUnitarioBs,
    calculateMontoTotalBs,
    calculateMontoTotalUsd,
    calculateTasaBcv,
  } = useCalculations();

  const [values, setValues] = useState(initialValues);

  const lastValuesRef = useRef(values);

  useEffect(() => {
    if (
      typeof onChange === "function" &&
      JSON.stringify(values) !== JSON.stringify(lastValuesRef.current)
    ) {
      onChange(values, errors);
      lastValuesRef.current = values;
    }
  }, [values, onChange, errors]);
  const onSubmit = (data: any) => {
    if (typeof onChange === "function") {
      onChange(data, errors);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          "& > :not(style)": { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <SparePartsFormPay
          control={control}
          setValues={setValues}
          values={values}
          spareParts={spareParts}
          sparePartVariants={sparePartVariants}
        />
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
              onChange={(event) => {
                field.onChange(event); // Esto es necesario para que react-hook-form rastree los cambios
                setValues({
                  ...values,
                  ocOs: event.target.value,
                });
              }}
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
              onChange={(date) => {
                onChange(date); // Esto es necesario para que react-hook-form rastree los cambios
                setValues({
                  ...values,
                  fechaOcOs: format(date, "yyyy-MM-dd"), // Formatea la fecha en el formato 'yyyy-MM-dd'
                });
              }}
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
              onChange={(event) => {
                field.onChange(event); // Esto es necesario para que react-hook-form rastree los cambios
                trigger("numeroOrdenPago"); // valida el campo
                const newNumeroOrdenPago = event.target.value;
                setValues({
                  ...values,
                  numeroOrdenPago: newNumeroOrdenPago,
                });
              }}
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
              onChange={(event) => {
                field.onChange(event); // Esto es necesario para que react-hook-form rastree los cambios
                const newObservacion = event.target.value;
                setValues({
                  ...values,
                  observacion: newObservacion,
                });
              }}
            />
          )}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default PaymentForm;
