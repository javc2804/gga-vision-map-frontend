import React, { useState } from "react";
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
import { useSelector } from "react-redux";

const CreateNoteInvoice = () => {
  const location = useLocation();
  const { data } = location.state || {};
  console.log(data);

  const result = useSelector((state: any) => state.purchase.combined);
  console.log(result.fleets);

  const [formularios, setFormularios] = useState([{}]);
  const [nextId, setNextId] = useState(2);

  const agregarFormulario = () => {
    setFormularios([...formularios, { id: nextId }]);
    setNextId(nextId + 1);
  };
  const eliminarFormulario = (id) => {
    const nuevosFormularios = formularios.filter(
      (formulario) => formulario.id !== id
    );
    setFormularios(nuevosFormularios);
  };

  const handleUTChange = (event, value, index) => {
    const updatedFormularios = [...formularios];
    const selectedFleet = result.fleets.find((fleet) => fleet.ut === value.ut);
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
    console.log(formularios);
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
            borderRadius: "15px",
            backgroundColor: "white",
          }}
        >
          <form>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Grid item xs={2}>
                  <Autocomplete
                    options={Array.isArray(result.fleets) ? result.fleets : []}
                    getOptionLabel={(option) => option.ut}
                    onChange={(event, value) =>
                      handleUTChange(event, value, index)
                    }
                    renderInput={(params) => (
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
                <TextField label="Observación" variant="outlined" fullWidth />
              </Grid>

              {/* Segunda fila */}
              <Grid item xs={2}>
                <TextField
                  label="Cantidad"
                  type="number"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={2}>
                <FormControl fullWidth>
                  <InputLabel>Entregado por</InputLabel>
                  <Select label="Entregado por">
                    <MenuItem value="persona1">Persona 1</MenuItem>
                    <MenuItem value="persona2">Persona 2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <FormControl fullWidth>
                  <InputLabel>Tiempo</InputLabel>
                  <Select label="Tiempo">
                    <MenuItem value="tiempo1">Tiempo 1</MenuItem>
                    <MenuItem value="tiempo2">Tiempo 2</MenuItem>
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
                <FormControl fullWidth>
                  <InputLabel>Repuesto</InputLabel>
                  <Select label="Repuesto">
                    <MenuItem value="repuesto1">Repuesto 1</MenuItem>
                    <MenuItem value="repuesto2">Repuesto 2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <FormControl fullWidth>
                  <InputLabel>Descripción Repuesto</InputLabel>
                  <Select label="Descripción Repuesto">
                    <MenuItem value="descripcion1">Descripción 1</MenuItem>
                    <MenuItem value="descripcion2">Descripción 2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Botones, sin cambios, perfectos como están */}
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
    </div>
  );
};

export default CreateNoteInvoice;
