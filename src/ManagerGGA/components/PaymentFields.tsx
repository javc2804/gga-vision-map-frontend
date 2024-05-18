import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
interface PaymentFieldsProps {
  control: any;
  errors: any;
  trigger: any;
  values: {
    cantidad: number;
    precioUnitarioBs: number;
    precioUnitarioUsd: number;
    tasaBcv: number;
    montoTotalBs: number;
    montoTotalUsd: number;
  };
  setValues: (values: any) => void;
  setValue: (name: string, value: number) => void;
  calculateMontoTotalBs: (cantidad: number, precioUnitarioBs: number) => number;
  calculateMontoTotalUsd: (
    cantidad: number,
    precioUnitarioUsd: number
  ) => number;
  calculatePrecioUnitarioUsd: (
    precioUnitarioBs: number,
    tasaBcv: number
  ) => number;
  calculatePrecioUnitarioBs: (montoTotalBs: number, cantidad: number) => number;
  calculateTasaBcv: (
    precioUnitarioBs: number,
    precioUnitarioUsd: number
  ) => number;
}

export const PaymentFields: React.FC<PaymentFieldsProps> = ({
  control,
  errors,
  trigger,
  values,
  setValues,
  setValue,
  calculateMontoTotalBs,
  calculateMontoTotalUsd,
  calculatePrecioUnitarioUsd,
  calculatePrecioUnitarioBs,
  calculateTasaBcv,
}) => {
  return (
    <>
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
              const newCantidad = Number(event.target.value);
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
              const newPrecioUnitarioBs = Number(event.target.value);
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
              const newTasaBcv = Number(event.target.value);
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
              const newPrecioUnitarioUsd = Number(event.target.value);
              const newPrecioUnitarioBs =
                Number(values.tasaBcv) * newPrecioUnitarioUsd;
              setValues({
                ...values,
                precioUnitarioUsd: newPrecioUnitarioUsd.toString(),
                precioUnitarioBs: newPrecioUnitarioBs.toString(),
              });
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
              const newMontoTotalBs = Number(event.target.value);
              const newPrecioUnitarioBs = calculatePrecioUnitarioBs(
                newMontoTotalBs,
                Number(values.cantidad)
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
              const newMontoTotalUsd = Number(event.target.value);
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
              const newTasaBcv = Number(event.target.value);
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
    </>
  );
};

export default PaymentFields;
