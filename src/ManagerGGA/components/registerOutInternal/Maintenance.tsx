import { TextField, Grid, Button, Paper, Box } from "@mui/material";
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
import { useMultipleFormInternal } from "../../hooks/outInternal/useMultipleFormInternal";

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
  const emailFromLocalStorage = localStorage.getItem("email") || "";

  const initialFormValues = fields.reduce<FormValues>(
    (acc, field) => {
      if (field.type === "number") {
        acc[field.name] = 0;
      } else if (field.type === "date") {
        acc[field.name] = "";
      } else {
        acc[field.name] = "";
      }
      return acc;
    },
    { user_rel: emailFromLocalStorage }
  );

  const { forms, setForms, addForm, removeForm, handleFormChange } =
    useMultipleFormInternal(initialFormValues);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const { openSnackbar, SnackbarComponent } = useSnackbar();

  const dispatch = useDispatch();

  const handleChange = (value: any, field: any, formIndex: number) => {
    let formsCopy = [...forms]; // Hacer una copia del estado actual de forms
    let currentForm = formsCopy[formIndex]; // Obtener el formulario actual por índice
    let errors = { ...formErrors }; // Copiar los errores existentes
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

    currentForm[name] = formattedValue;

    if (name === "user_rel") {
      localStorage.setItem("email", formattedValue);
    }

    formsCopy[formIndex] = currentForm;
    setForms(formsCopy); // Actualizar el estado de forms con la copia modificada
    setFormErrors(errors);
  };

  const handleSubmit = () => {
    const hasErrors = Object.keys(formErrors).length > 0;
    if (!hasErrors) {
      setIsSubmitting(true); // Se establece correctamente aquí
      dispatch(startCreateOutInternal(forms))
        .then(() => {
          openSnackbar("Operación exitosa.", "success", CheckCircleIcon);
        })
        .catch((error: any) => {
          openSnackbar(`Error en la operación.${error}`, "error", ErrorIcon);
        });
    } else {
      openSnackbar("El formulario contiene errores.", "error", ErrorIcon);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
      <Box style={{ maxHeight: "70vh", overflowY: "auto" }}>
        {forms.map((form, formIndex) => (
          <Paper
            key={formIndex}
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
                        form[field.name]
                          ? new Date(form[field.name] + "T00:00:00")
                          : null
                      }
                      onChange={(newValue: Date | null) => {
                        const formattedDate = newValue
                          ? format(newValue, "yyyy-MM-dd")
                          : "";
                        handleChange(formattedDate, field, formIndex); // Corregido para pasar el valor formateado, el campo y el índice del formulario
                      }}
                      renderInput={(params) => <TextField {...params} />}
                      format="dd/MM/yyyy"
                    />
                  ) : (
                    <TextField
                      fullWidth
                      label={field.label}
                      variant="outlined"
                      type={field.type === "number" ? "text" : field.type}
                      name={field.name}
                      value={form[field.name]} // Asegúrate de que esto refleje el estado actual del formulario específico
                      onChange={(e) => handleFormChange(formIndex, e)} // Ajuste aquí para pasar el índice y el evento
                      error={!!formErrors[field.name]}
                      helperText={formErrors[field.name]}
                    />
                  )}
                </Grid>
              ))}
            </Grid>
            <Grid item xs={12} container justifyContent="flex-end">
              {forms.length > 1 && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => removeForm(formIndex)}
                  style={{ marginRight: "10px" }}
                >
                  Borrar
                </Button>
              )}
              {formIndex === forms.length - 1 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => addForm()}
                >
                  Agregar
                </Button>
              )}
            </Grid>
          </Paper>
        ))}
      </Box>
      <Grid
        sx={{ marginTop: "2%" }}
        item
        xs={12}
        container
        justifyContent="flex-end"
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          Guardar
        </Button>
      </Grid>
      {SnackbarComponent}
    </LocalizationProvider>
  );
};

export default Maintenance;
