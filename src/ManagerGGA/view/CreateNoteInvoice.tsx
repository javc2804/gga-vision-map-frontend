import { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Paper,
  Autocomplete,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startCreateNDE } from "../../store/almacen/almacenThunk";

interface Fleet {
  ut: string;
}

type FormularioType = {
  id: any;
  id_items: number;
  quantity: string;
  spare_part: any;
  spare_part_variant: any;
  observation: string;
  note_number: any;
  provider: any;
  delivered_by: string;
  inventario: string;
  marcaModelo: string;
  status: boolean;
  subeje?: string;
  eje?: string;
  ut?: string;
};

const CreateNoteInvoice = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { data } = location.state || {};
  const result = useSelector((state: any) => state.purchase.combined);
  // const [delivered_by, setdelivered_by] = useState("");
  // const [inventario, setinventario] = useState("");

  const [formularios, setFormularios] = useState<FormularioType[]>([
    {
      id: data.id,
      id_items: 1,
      quantity: "",
      spare_part: data.repuesto,
      spare_part_variant: data.descripcionRepuesto,
      observation: "",
      note_number: data.facNDE,
      provider: data.proveedor,
      delivered_by: "",
      inventario: "",
      marcaModelo: "",
      status: false,
      subeje: data.subeje || "", // Initialize `subeje` here
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
    setFormularios([
      ...formularios,
      {
        id: data.id,
        id_items: nextId,
        note_number: data.facNDE,
        provider: data.proveedor,
        quantity: "",
        spare_part: data.repuesto,
        spare_part_variant: data.descripcionRepuesto,
        observation: "",
        delivered_by: "",
        inventario: "",
        marcaModelo: "",
        status: false,
      },
    ]);
    setNextId(nextId + 1);
  };

  const eliminarFormulario = (id: any) => {
    const nuevosFormularios = formularios.filter(
      (formulario) => formulario.id !== id
    );
    setFormularios(nuevosFormularios);
  };

  const handleUTChange = (value: any, index: any) => {
    const updatedFormularios = [...formularios];
    const selectedFleet = result.fleets.find(
      (fleet: any) => fleet.ut === value.ut
    );
    if (selectedFleet) {
      updatedFormularios[index] = {
        ...updatedFormularios[index],
        ut: value.ut,
        marcaModelo: selectedFleet.marcaModelo,
        eje: selectedFleet.eje,
        subeje: selectedFleet.subeje,
      };
    }
    setFormularios(updatedFormularios);
  };

  const handleEntregadoChange = (event: any, index: any) => {
    const updatedFormularios = [...formularios];
    updatedFormularios[index].delivered_by = event.target.value;
    setFormularios(updatedFormularios);
  };

  const handleinventarioChange = (event: any, index: any) => {
    const updatedFormularios = [...formularios];
    updatedFormularios[index].inventario = event.target.value;
    setFormularios(updatedFormularios);
  };

  const save = () => {
    const formulariosConUserRel = formularios.map((formulario) => ({
      ...formulario,
      user_rel: localStorage.getItem("email") || "",
    }));

    const todosCamposRellenados = formulariosConUserRel.every((formulario) => {
      return Object.values(formulario).every((valor) => {
        const valorComoCadena = String(valor).trim();
        return valorComoCadena !== "";
      });
    });

    if (todosCamposRellenados) {
      dispatch(startCreateNDE(formulariosConUserRel));
    } else {
      console.error("Error: Todos los campos deben estar rellenados.");
    }
  };

  return (
    <div>
      <h2>Crear nota de entrega</h2>
      {formularios.map((formulario, index) => (
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
              <Grid item xs={2}>
                <Autocomplete
                  options={Array.isArray(result.fleets) ? result.fleets : []}
                  getOptionLabel={(option: Fleet) => option.ut}
                  onChange={(_event, value) => handleUTChange(value, index)}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      label="UT"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                  sx={{ width: 150 }}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  disabled
                  label="Modelo/Marca"
                  variant="outlined"
                  fullWidth
                  value={formulario.marcaModelo}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  disabled
                  label="Eje"
                  variant="outlined"
                  fullWidth
                  value={formulario.eje}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  disabled
                  label="Sub Eje"
                  variant="outlined"
                  fullWidth
                  value={formulario.subeje}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  disabled
                  label="Fac/NDE"
                  variant="outlined"
                  value={data.facNDE}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  label="Observación"
                  onChange={(event) => handleObservacionChange(event, index)}
                  value={formulario.observation}
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              {/* Segunda fila */}
              <Grid item xs={2}>
                <TextField
                  onChange={(event) => handleCantidadChange(event, index)}
                  value={formulario.quantity}
                  label="Cantidad"
                  type="number"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={2}>
                <FormControl fullWidth>
                  <InputLabel>Entregado por</InputLabel>
                  <Select
                    label="Entregado por"
                    value={formulario.delivered_by} // Usar el valor del estado del formulario actual
                    onChange={(event) => handleEntregadoChange(event, index)}
                  >
                    <MenuItem value="store">Almacen</MenuItem>
                    <MenuItem value="direct">Directo</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <FormControl fullWidth>
                  <InputLabel>Inventario</InputLabel>
                  <Select
                    label="inventario"
                    value={formulario.inventario} // Usar el valor del estado del formulario actual
                    onChange={(event) => handleinventarioChange(event, index)}
                  >
                    <MenuItem value="actual">Actual</MenuItem>
                    <MenuItem value="anteriores">Años anteriores</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  disabled
                  label="Proveedor"
                  variant="outlined"
                  value={data.proveedor}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  disabled
                  label="Repuesto"
                  variant="outlined"
                  value={data.repuesto}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  disabled
                  label="Descripción Repuesto"
                  variant="outlined"
                  value={data.descripcionRepuesto}
                  InputLabelProps={{
                    shrink: true,
                  }}
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
            <Grid container justifyContent="flex-end" style={{ marginTop: 20 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={agregarFormulario}
                style={{ marginRight: 10 }}
              >
                Agregar
              </Button>
            </Grid>
          )}
          {index < formularios.length - 1 && (
            <Grid container justifyContent="flex-end" style={{ marginTop: 20 }}>
              <Button
                variant="contained"
                color="error"
                onClick={() => eliminarFormulario(formulario.id)}
              >
                Eliminar
              </Button>
            </Grid>
          )}
        </Paper>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={save}
        style={{ marginRight: 10 }}
      >
        Guardar
      </Button>
    </div>
  );
};

export default CreateNoteInvoice;
