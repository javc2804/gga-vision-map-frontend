import { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Select,
  MenuItem,
} from "@mui/material";
import { useSnackbar } from "../../hooks/useSnackBar";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ErrorOutline, CheckCircle } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { startCreateOutInternal } from "../../store/out-internal/outInternalThunk";

type FormularioType = {
  id_items: number;
  proveedorBeneficiario: string; // Proveedor/Beneficiario
  descripcionGasto: string; // Descripcion del gasto
  ordenPagoNumero: string; // Nº de Orden de Pago
  relacionMesPago: string; // Relación mes de pago
  montoPagadoBs: string; // Monto Pagado Bolivares
  montoPagadoUsd: string; // Monto Pagado Bolivares
  montoCompromisoUsd: string; // Monto compromiso $
  montoCompromisoBs: string; // Monto compromiso Bolivares
  tipoGasto: string; // Tipo de gasto
  fechaTasa: Date | null; // Fecha de la tasa
  fechaPago: Date | null; // Fecha del pago
  fechaFactura: Date | null; // Fecha factura
  tasaBcv: string; // Tasa Bcv
};

export const RegisterOutInternal = () => {
  const dispatch = useDispatch();
  const { SnackbarComponent, openSnackbar } = useSnackbar();
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(false);

  const [formularios, setFormularios] = useState<FormularioType[]>([
    {
      id_items: 1,
      proveedorBeneficiario: "",
      descripcionGasto: "",
      ordenPagoNumero: "",
      relacionMesPago: "",
      montoPagadoBs: "",
      montoCompromisoUsd: "",
      montoCompromisoBs: "",
      montoPagadoUsd: "",
      tipoGasto: "",
      fechaTasa: null,
      fechaPago: null,
      fechaFactura: null,
      tasaBcv: "",
    },
  ]);
  const [nextId, setNextId] = useState(2);

  const agregarFormulario = () => {
    setFormularios(
      formularios.concat([
        {
          id_items: nextId,
          proveedorBeneficiario: "",
          descripcionGasto: "",
          ordenPagoNumero: "",
          relacionMesPago: "",
          montoPagadoBs: "",
          montoCompromisoUsd: "",
          montoCompromisoBs: "",
          montoPagadoUsd: "",
          tipoGasto: "",
          fechaTasa: null,
          fechaPago: null,
          fechaFactura: null,
          tasaBcv: "",
        },
      ])
    );
    setNextId(nextId + 1);
  };

  const eliminarFormulario = (idItemSeleccionado: number) => {
    if (formularios.length > 1) {
      const formulariosActualizados = formularios.filter(
        (formulario) => formulario.id_items !== idItemSeleccionado
      );
      setFormularios(formulariosActualizados);
    } else {
      console.log("No se puede eliminar el único formulario restante.");
    }
  };

  const save = () => {
    console.log(formularios);
    const formulariosConUserRel = formularios.map((formulario) => ({
      ...formulario,
      user_rel: localStorage.getItem("email") || "",
    }));

    console.log(formulariosConUserRel);

    const todosCamposRellenados = formulariosConUserRel.every((formulario) => {
      return Object.values(formulario).every((valor) => {
        const valorComoCadena = String(valor).trim();
        return valorComoCadena !== "";
      });
    });

    if (todosCamposRellenados) {
      setIsSaveButtonDisabled(true);
      dispatch(startCreateOutInternal(formulariosConUserRel));
      openSnackbar("Guardado exitosamente", "success", CheckCircle);
    } else {
      openSnackbar(
        `Error, Todos los campos deben estar rellenados.`,
        "error",
        ErrorOutline
      );
    }
  };

  // const [value, setValue] = useState("");

  // const handleChange = (event: any, index: any) => {
  //   const updatedFormularios = [...formularios];
  //   updatedFormularios[index].selectedValue = event.target.value;
  //   setFormularios(updatedFormularios);
  // };

  const formFieldOptions = [
    { value: "", label: "Seleccione un tipo de gasto" }, // Opción por defecto

    { value: "apoyoInstitucional", label: "Apoyo institucional" },
    { value: "ayuda", label: "Ayuda" },
    { value: "bolsaDeTrabajo", label: "Bolsa de trabajo" },
    {
      value: "bonoVarios",
      label: "Bono (Coordinador, Vialidad, Recaudación y Apoyo Institucional)",
    },
    { value: "donacion", label: "Donación" },
    { value: "honorarios", label: "Honorarios" },
    { value: "viaticos", label: "Viáticos" },
    { value: "funcionamiento", label: "Funcionamiento" },
    { value: "nomina", label: "Nómina" },
    { value: "bonoCoordinadores", label: "Bono coordinadores" },
  ];

  const formFields = [
    {
      type: "TextField",
      label: "Proveedor/Beneficiario",
      name: "proveedorBeneficiario",
    },
    {
      type: "TextField",
      label: "Descripcion del gasto",
      name: "descripcionGasto",
    },
    {
      type: "Select",
      label: "Tipo de gasto",
      name: "tipoGasto",
      options: formFieldOptions,
    },
    { type: "DatePicker", label: "Fecha factura", name: "fechaFactura" },
    {
      type: "TextField",
      label: "Tasa Bcv",
      name: "tasaBcv",
      inputType: "number",
    },
    { type: "DatePicker", label: "Fecha de la tasa", name: "fechaTasa" },

    {
      type: "TextField",
      label: "Nº de Orden de Pago",
      name: "ordenPagoNumero",
      inputType: "number",
    },
    { type: "DatePicker", label: "Fecha del pago", name: "fechaPago" },

    {
      type: "TextField",
      label: "Relación mes de pago",
      name: "relacionMesPago",
    },
    {
      type: "TextField",
      label: "Monto Pagado Bolivares",
      name: "montoPagadoBs",
      inputType: "number",
    },
    {
      type: "TextField",
      label: "Monto Pagado $",
      name: "montoPagadoUsd",
      inputType: "number",
    },
    {
      type: "TextField",
      label: "Monto compromiso  $",
      name: "montoCompromisoUsd",
      inputType: "number",
    },
    {
      type: "TextField",
      label: "Monto compromiso Bolivares",
      name: "montoCompromisoBs",
      inputType: "number",
    },
  ];

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    fieldName: keyof FormularioType
  ) => {
    const updatedFormularios = [...formularios];
    updatedFormularios[index][fieldName] = event.target.value;
    setFormularios(updatedFormularios);
  };

  return (
    <div style={{ overflowY: "auto", maxHeight: "85vh" }}>
      <h2>Registrar gasto de funcionamiento</h2>
      {formularios.map((formulario, index) => (
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          key={formulario.id || index}
        >
          <Paper
            key={formulario.id}
            elevation={3}
            style={{
              padding: "20px",
              marginBottom: "2%",
              borderRadius: "15px",
              backgroundColor: "white",
            }}
          >
            <form>
              <Grid container spacing={2}>
                {formFields.map((field) => (
                  <Grid item xs={3} key={field.label}>
                    {field.type === "TextField" && (
                      <TextField
                        label={field.label}
                        type={field.inputType || "text"}
                        value={formulario[field.name]}
                        onChange={(event) =>
                          handleFieldChange(event, index, field.name)
                        }
                        variant="outlined"
                        fullWidth
                      />
                    )}
                    {field.type === "Select" && (
                      <Select
                        value={formulario[field.name]}
                        onChange={(event) =>
                          handleFieldChange(event, index, field.name)
                        }
                        displayEmpty
                        fullWidth
                      >
                        <MenuItem value="" disabled>
                          Seleccione un tipo de pago
                        </MenuItem>
                        {field.options?.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                    {field.type === "DatePicker" && (
                      <DatePicker
                        label={field.label}
                        value={formulario[field.name]}
                        onChange={(newValue) => {
                          handleFieldChange(
                            { target: { value: newValue } },
                            index,
                            field.name
                          );
                        }}
                        renderInput={(params) => <TextField {...params} />}
                        format="dd/MM/yyyy"
                      />
                    )}
                  </Grid>
                ))}
              </Grid>
            </form>
            {index === formularios.length - 1 && (
              <Grid
                container
                justifyContent="flex-end"
                style={{ marginTop: 20 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={agregarFormulario}
                  style={{ marginRight: 10 }}
                >
                  Agregar
                </Button>
                {formularios.length > 1 && (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => eliminarFormulario(formulario.id_items)} // Asegúrate de pasar el id_items correcto
                  >
                    Eliminar
                  </Button>
                )}
              </Grid>
            )}
            {index < formularios.length - 1 && (
              <Grid
                container
                justifyContent="flex-end"
                style={{ marginTop: 20 }}
              >
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => eliminarFormulario(formulario.id_items)}
                >
                  Eliminar
                </Button>
              </Grid>
            )}
          </Paper>
        </LocalizationProvider>
      ))}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <TextField
          label="Cantidad Disponible"
          variant="outlined"
          style={{ marginBottom: 10 }}
          InputLabelProps={{ shrink: true }}
          disabled
        />
        <TextField
          label="Cantidad asignada"
          disabled
          variant="outlined"
          style={{ marginBottom: 10 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={save}
          // disabled={isSaveButtonDisabled}
          style={{ marginRight: 10 }}
        >
          Guardar
        </Button>
        {SnackbarComponent}
      </div>
    </div>
  );
};

export default RegisterOutInternal;
