import { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useSnackbar } from "../../hooks/useSnackBar";

type FormularioType = {
  id: any;
  id_items: number;
  quantity: string;
  observation: string;
  selectedValue: any;
};

export const RegisterOutInternal = () => {
  const { SnackbarComponent, openSnackbar } = useSnackbar();
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(false);

  const [formularios, setFormularios] = useState<FormularioType[]>([
    {
      id: "",
      id_items: 1,
      quantity: "",
      observation: "",
      selectedValue: "", // Nuevo campo para almacenar el valor seleccionado
    },
  ]);
  const [nextId, setNextId] = useState(2);

  const handleCantidadChange = (event: any, index: any) => {
    const updatedFormularios = [...formularios];
    updatedFormularios[index].quantity = event.target.value;
    setFormularios(updatedFormularios);
  };

  const handleObservacionChange = (event: any, index: any) => {
    const updatedFormularios = [...formularios];
    updatedFormularios[index].observation = event.target.value;
    setFormularios(updatedFormularios);
  };

  const agregarFormulario = () => {
    setFormularios(
      formularios.concat([
        {
          id: "",
          id_items: nextId,
          quantity: "",
          observation: "",
          selectedValue: "",
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
    // const formulariosConUserRel = formularios.map((formulario) => ({
    //   ...formulario,
    //   user_rel: localStorage.getItem("email") || "",
    // }));

    // const todosCamposRellenados = formulariosConUserRel.every((formulario) => {
    //   return Object.values(formulario).every((valor) => {
    //     const valorComoCadena = String(valor).trim();
    //     return valorComoCadena !== "";
    //   });
    // });

    // if (todosCamposRellenados) {
    //   setIsSaveButtonDisabled(true);
    //   openSnackbar("Guardado exitosamente", "success", CheckCircle);
    // } else {
    //   openSnackbar(
    //     `Error, Todos los campos deben estar rellenados.`,
    //     "error",
    //     ErrorOutline
    //   );
    // }
  };
  const [value, setValue] = useState("");

  const handleChange = (event: any, index: any) => {
    const updatedFormularios = [...formularios];
    updatedFormularios[index].selectedValue = event.target.value;
    setFormularios(updatedFormularios);
  };

  return (
    <div style={{ overflowY: "auto", maxHeight: "85vh" }}>
      <h2>Registrar gasto de funcionamiento</h2>
      {formularios.map((formulario, index) => (
        <Box key={formulario.id || index}>
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
                <Grid item xs={3}>
                  <TextField
                    label="Proveedor/Beneficiario"
                    onChange={(event) => handleObservacionChange(event, index)}
                    value={formulario.observation}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Descripcion del gasto"
                    onChange={(event) => handleObservacionChange(event, index)}
                    value={formulario.observation}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Tipo de gasto
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formulario.selectedValue} // Cambiado para usar el valor del formulario actual
                      label="Categoría"
                      onChange={(event) => handleChange(event, index)} // Asegúrate de pasar el índice correcto
                    >
                      <MenuItem value="apoyoInstitucional">
                        Apoyo institucional
                      </MenuItem>
                      <MenuItem value="ayuda">Ayuda</MenuItem>
                      <MenuItem value="bolsaDeTrabajo">
                        Bolsa de trabajo
                      </MenuItem>
                      <MenuItem value="bonoVarios">
                        Bono (Coordinador, Vialidad, Recaudación y Apoyo
                        Institucional)
                      </MenuItem>
                      <MenuItem value="donacion">Donación</MenuItem>
                      <MenuItem value="honorarios">Honorarios</MenuItem>
                      <MenuItem value="viaticos">Viáticos</MenuItem>
                      <MenuItem value="funcionamiento">Funcionamiento</MenuItem>
                      <MenuItem value="nomina">Nómina</MenuItem>
                      <MenuItem value="bonoCoordinadores">
                        Bono coordinadores
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    onChange={(event) => handleCantidadChange(event, index)}
                    value={formulario.quantity}
                    label="Fecha factura"
                    type="number"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    onChange={(event) => handleCantidadChange(event, index)}
                    value={formulario.quantity}
                    label="Tasa Bcv"
                    type="number"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    onChange={(event) => handleCantidadChange(event, index)}
                    value={formulario.quantity}
                    label="Fecha de la tasa"
                    type="number"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    onChange={(event) => handleCantidadChange(event, index)}
                    value={formulario.quantity}
                    label="Nº de Orden de Pago"
                    type="number"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    onChange={(event) => handleCantidadChange(event, index)}
                    value={formulario.quantity}
                    label="Fecha de Pago"
                    type="number"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    onChange={(event) => handleCantidadChange(event, index)}
                    value={formulario.quantity}
                    label="Relación mes de pago"
                    type="number"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    onChange={(event) => handleCantidadChange(event, index)}
                    value={formulario.quantity}
                    label="Monto compromiso Bolivares"
                    type="number"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    onChange={(event) => handleCantidadChange(event, index)}
                    value={formulario.quantity}
                    label="Monto Pagado Bolivares "
                    type="number"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    onChange={(event) => handleCantidadChange(event, index)}
                    value={formulario.quantity}
                    label="Monto compromiso  $$ "
                    type="number"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    onChange={(event) => handleCantidadChange(event, index)}
                    value={formulario.quantity}
                    label="Monto Pagado $$  "
                    type="number"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  style={{
                    marginTop: 20,
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                ></Grid>
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
        </Box>
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
          disabled={isSaveButtonDisabled}
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
