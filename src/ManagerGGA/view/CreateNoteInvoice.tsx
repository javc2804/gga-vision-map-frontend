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

  const result = useSelector((state: any) => state.purchase.combined);
  const [entregadoPor, setEntregadoPor] = useState("");
  const [inventario, setinventario] = useState("");

  const [formularios, setFormularios] = useState([
    {
      id: 1,
      cantidad: "",
      repuesto: "",
      descripcionRepuesto: "",
      observacion: "",
      facNDE: data.facNDE,
      proveedor: data.proveedor,
      entregadoPor: "",
      inventario: "",
    },
  ]);
  const [nextId, setNextId] = useState(2);

  const handleCantidadChange = (event, index) => {
    const updatedFormularios = [...formularios];
    updatedFormularios[index].cantidad = event.target.value;
    setFormularios(updatedFormularios);
  };

  const handleRepuestoChange = (event, index) => {
    const updatedFormularios = [...formularios];
    updatedFormularios[index].repuesto = event.target.value;
    setFormularios(updatedFormularios);
  };

  const handleObservacionChange = (event, index) => {
    const updatedFormularios = [...formularios];
    updatedFormularios[index].observacion = event.target.value;
    setFormularios(updatedFormularios);
  };

  const agregarFormulario = () => {
    setFormularios([
      ...formularios,
      {
        id: nextId,
        facNDE: data.facNDE, // Asegura que facNDE sea constante
        proveedor: data.proveedor, // Asegura que proveedor sea constante
        cantidad: "",
        repuesto: "",
        descripcionRepuesto: "",
        observacion: "",
        entregadoPor: "",
        inventario: "",
      },
    ]);
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
  };

  const handleDescriptionChange = (event, value, index) => {
    const updatedFormularios = [...formularios];
    updatedFormularios[index].descripcionRepuesto = value ? value.variant : "";
    setFormularios(updatedFormularios);
  };

  const handleEntregadoChange = (event, index) => {
    const updatedFormularios = [...formularios];
    updatedFormularios[index].entregadoPor = event.target.value;
    setFormularios(updatedFormularios);
  };

  const handleinventarioChange = (event, index) => {
    const updatedFormularios = [...formularios];
    updatedFormularios[index].inventario = event.target.value;
    setFormularios(updatedFormularios);
  };

  const save = () => {
    const todosCamposRellenados = formularios.every((formulario) => {
      return Object.values(formulario).every((valor) => {
        // Convertir todos los valores a cadenas antes de llamar a trim()
        const valorComoCadena = String(valor).trim();
        return valorComoCadena !== "";
      });
    });

    if (todosCamposRellenados) {
      console.log("Guardado");
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
                  value={formulario.observacion}
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              {/* Segunda fila */}
              <Grid item xs={2}>
                <TextField
                  onChange={(event) => handleCantidadChange(event, index)}
                  value={formulario.cantidad}
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
                    value={formulario.entregadoPor} // Usar el valor del estado del formulario actual
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
                <FormControl fullWidth>
                  <InputLabel>Repuesto</InputLabel>
                  <Select
                    label="Repuesto"
                    onChange={(event) => handleRepuestoChange(event, index)}
                    value={formulario.repuesto}
                  >
                    <MenuItem value="baterias">Bateria</MenuItem>
                    <MenuItem value="cauchos">Caucho</MenuItem>
                    <MenuItem value="lubricantes">Lubricante</MenuItem>
                    <MenuItem value="servicios">Servicio</MenuItem>
                    <MenuItem value="preventivo">Preventivo</MenuItem>
                    <MenuItem value="filtros">Filtros</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <Autocomplete
                  value={
                    (result.sparePartVariants &&
                      result.sparePartVariants.find(
                        (variant) =>
                          variant.variant === formulario.descripcionRepuesto
                      )) ||
                    null // Asegura que el valor inicial no sea undefined
                  }
                  options={result.sparePartVariants || []}
                  getOptionLabel={(option) => option.variant || ""}
                  onChange={(event, value) =>
                    handleDescriptionChange(event, value, index)
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Descripción del repuesto" />
                  )}
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
