import { TextField, Button } from "@mui/material";

export const FiltersInventory = () => {
  return (
    <div>
      {[...Array(1)].map((_, index) => (
        <TextField
          key={index}
          label={`Buscar`}
          variant="outlined"
          margin="normal"
        />
      ))}
      <div>
        <Button variant="contained" color="primary" style={{ margin: "8px" }}>
          Buscar
        </Button>
        {/* <Button variant="contained" color="secondary" style={{ margin: "8px" }}>
          Limpiar filtros
        </Button> */}
        {/* <Button variant="contained" color="secondary" style={{ margin: "8px" }}>
          Crear
        </Button> */}
        <Button variant="contained" color="warning" style={{ margin: "8px" }}>
          Exportar
        </Button>
      </div>
    </div>
  );
};

export default FiltersInventory;
