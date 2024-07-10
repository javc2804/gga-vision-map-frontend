import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import {
  ApoyoInstitucional,
  Ayuda,
  BolsaDeTrabajo,
  BonoVarios,
  Donacion,
  Honorarios,
  Viaticos,
  Funcionamiento,
  Nomina,
  BonoCoordinadores,
} from "../components/out-internal";

const RegisterOutInternal = () => {
  const [value, setValue] = React.useState("");

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  // Objeto de mapeo para los componentes
  const componentMap: { [key: string]: JSX.Element } = {
    apoyoInstitucional: <ApoyoInstitucional />,
    ayuda: <Ayuda />,
    bolsaDeTrabajo: <BolsaDeTrabajo />,
    bonoVarios: <BonoVarios />,
    donacion: <Donacion />,
    honorarios: <Honorarios />,
    viaticos: <Viaticos />,
    funcionamiento: <Funcionamiento />,
    nomina: <Nomina />,
    bonoCoordinadores: <BonoCoordinadores />,
  };

  return (
    <div>
      <h1>Registrar gasto de funcionamiento</h1>
      <FormControl sx={{ minWidth: 540 }}>
        <InputLabel id="demo-simple-select-label">Descripción</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Categoría"
          onChange={handleChange}
        >
          <MenuItem value="apoyoInstitucional">Apoyo institucional</MenuItem>
          <MenuItem value="ayuda">Ayuda</MenuItem>
          <MenuItem value="bolsaDeTrabajo">Bolsa de trabajo</MenuItem>
          <MenuItem value="bonoVarios">
            Bono (Coordinador, Vialidad, Recaudación y Apoyo Institucional)
          </MenuItem>
          <MenuItem value="donacion">Donación</MenuItem>
          <MenuItem value="honorarios">Honorarios</MenuItem>
          <MenuItem value="viaticos">Viáticos</MenuItem>
          <MenuItem value="funcionamiento">Funcionamiento</MenuItem>
          <MenuItem value="nomina">Nómina</MenuItem>
          <MenuItem value="bonoCoordinadores">Bono coordinadores</MenuItem>
        </Select>
      </FormControl>
      {/* Renderizar el componente seleccionado */}
      <div>{componentMap[value]}</div>
    </div>
  );
};

export default RegisterOutInternal;
