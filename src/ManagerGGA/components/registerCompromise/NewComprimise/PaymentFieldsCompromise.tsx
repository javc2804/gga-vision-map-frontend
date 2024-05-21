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

export const PaymentFieldsCompromise: React.FC<PaymentFieldsProps> = ({
  control,
  errors,
  trigger,
  values,
  setValues,
  setValue,
  calculateMontoTotalUsd,
  calculatePrecioUnitarioUsd,
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
              field.onChange(event);
              trigger("cantidad");
              const newCantidad = Number(event.target.value);
              const newMontoTotalUsd = calculateMontoTotalUsd(
                values.precioUnitarioUsd,
                newCantidad
              );
              setValues({
                ...values,
                cantidad: newCantidad,
                montoTotalUsd: newMontoTotalUsd,
              });
              setValue("montoTotalUsd", newMontoTotalUsd);
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
              field.onChange(event);
              trigger("precioUnitarioUsd");
              const newPrecioUnitarioUsd = Number(event.target.value);
              const newPrecioUnitarioBs =
                Number(values.tasaBcv) * newPrecioUnitarioUsd;
              setValues({
                ...values,
                precioUnitarioUsd: newPrecioUnitarioUsd.toString(),
                precioUnitarioBs: newPrecioUnitarioBs.toString(),
              });
              setValue("precioUnitarioBs", newPrecioUnitarioBs);
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
              field.onChange(event);
              trigger("montoTotalUsd");
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
              });
              setValue("precioUnitarioUsd", newPrecioUnitarioUsd);
              setValue("tasaBcv", newTasaBcv);
            }}
          />
        )}
      />
    </>
  );
};

export default PaymentFieldsCompromise;
