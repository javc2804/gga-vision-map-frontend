import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

  useEffect(() => {
    if (typeof onChange === "function") {
      onChange(values, errors);
    }
  }, [values, onChange]);

  const onSubmit = (data) => {
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
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
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
      </Box>
    </LocalizationProvider>
  );
};

export default PaymentForm;
