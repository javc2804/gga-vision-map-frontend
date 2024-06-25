import { TextField, Grid, Button, Paper } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { startCreateOutInternal } from "../../../store/out-internal/outInternalThunk";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useSnackbar } from "../../../hooks/useSnackBar";
import ErrorIcon from "@mui/icons-material/Error"; // Importa el icono de error
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Importa el icono de éxito
import { format } from "date-fns"; // Asegúrate de tener esta importación para formatear las fechas
import esLocale from "date-fns/locale/es"; // Asegúrate de importar el locale correcto

interface FormErrors {
  [key: string]: string; // Assuming each form field error is a string message
}

interface DatePickerProps {
  label: string;
  value: any; // Adjust according to the expected type
  onChange: (newValue: any) => void;
  renderInput: (params: any) => JSX.Element;
}
interface FormValues {
  [key: string]: number | string; // Adjust this union type as needed
}

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

export const Maintenance = () => {
  const initialFormValues = fields.reduce<FormValues>((acc, field) => {
    if (field.type === "number") {
      acc[field.name] = 0; // Initialize numbers with 0
    } else if (field.type === "date") {
      acc[field.name] = ""; // Initialize dates with an empty string or you can use a specific date format
    } else {
      acc[field.name] = ""; // Initialize strings as empty string
    }
    return acc;
  }, {});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const { openSnackbar, SnackbarComponent } = useSnackbar();

  const dispatch = useDispatch();

  const handleChange = (value: any, field: any) => {
    let errors = { ...formErrors };
    let name = field.name;
    let formattedValue = value;

    if (field.type === "date" && value instanceof Date) {
      formattedValue = format(value, "yyyy-MM-dd");
    } else if (field.type === "number") {
      // Permite valores numéricos y decimales, pero no realiza la conversión todavía
      if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
        formattedValue = value; // Mantiene el valor como cadena para permitir decimales
        delete errors[name];
      } else {
        errors[name] = "El valor debe ser numérico";
        setFormErrors(errors);
        return;
      }
    } else {
      delete errors[name];
    }

    setFormValues({ ...formValues, [name]: formattedValue });
    setFormErrors(errors);
  };

  const handleSubmit = () => {
    const hasErrors = Object.keys(formErrors).length > 0;

    if (!hasErrors) {
      setIsSubmitting(true); // Se establece correctamente aquí
      dispatch(startCreateOutInternal(formValues))
        .then(() => {
          openSnackbar("Operación exitosa.", "success", CheckCircleIcon);
        })
        .catch((error: any) => {
          openSnackbar(`Error en la operación.${error}`, "error", ErrorIcon);
        });
    } else {
      openSnackbar("El formulario contiene errores.", "error", ErrorIcon);
    }
    console.log(formValues);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
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
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={index}
              style={{ width: "100%" }}
            >
              {field.type === "date" ? (
                <DatePicker
                  label={field.label}
                  value={
                    formValues[field.name]
                      ? new Date(formValues[field.name])
                      : null
                  }
                  format="dd/MM/yyyy"
                  onChange={(newValue: Date | null) => {
                    const formattedDate = newValue
                      ? format(newValue, "yyyy-MM-dd")
                      : "";
                    setFormValues({
                      ...formValues,
                      [field.name]: formattedDate,
                    });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                  inputFormat="dd/MM/yyyy" // Asegura que el formato de visualización sea dd/MM/yyyy
                />
              ) : (
                <TextField
                  fullWidth
                  label={field.label}
                  variant="outlined"
                  type={field.type === "number" ? "text" : field.type} // Asegúrate de usar "text" para los inputs numéricos para manejar la validación manualmente
                  name={field.name}
                  value={formValues[field.name]}
                  onChange={(e) => handleChange(e.target.value, field)} // Ajuste aquí
                  error={!!formErrors[field.name]}
                  helperText={formErrors[field.name]}
                />
              )}
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12} container justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            Guardar
          </Button>
        </Grid>
      </Paper>
      {SnackbarComponent}
    </LocalizationProvider>
  );
};

export default Maintenance;
