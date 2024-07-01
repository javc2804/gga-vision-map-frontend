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
} from "@mui/material";

const CreateNoteInvoice = () => {
  const [formularios, setFormularios] = useState([{}]);

  const agregarFormulario = () => {
    setFormularios([...formularios, {}]);
  };

  const eliminarFormulario = (index) => {
    const nuevosFormularios = formularios.filter((_, i) => i !== index);
    setFormularios(nuevosFormularios);
  };

  return (
    <div>
      <h2>Crear nota de entrega</h2>
      {formularios.map((formulario, index) => (
        <Paper
          elevation={3}
          style={{
            padding: "20px",
            borderRadius: "15px",
            backgroundColor: "white",
          }}
        >
          <form>
            <Grid container spacing={2}>
              {/* Primera fila */}
              <Grid item xs={2}>
                <TextField label="UT" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={2}>
                <TextField label="Modelo/Marca" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={2}>
                <TextField label="Eje" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={2}>
                <TextField label="Sub Eje" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={2}>
                <TextField label="Fac/NDE" variant="outlined" fullWidth />
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
                <FormControl fullWidth>
                  <InputLabel>Proveedor</InputLabel>
                  <Select label="Proveedor">
                    <MenuItem value="proveedor1">Proveedor 1</MenuItem>
                    <MenuItem value="proveedor2">Proveedor 2</MenuItem>
                  </Select>
                </FormControl>
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
                onClick={() => eliminarFormulario(index)}
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
