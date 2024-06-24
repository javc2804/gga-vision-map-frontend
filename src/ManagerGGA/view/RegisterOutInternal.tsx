import React from "react";
import {
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
// Asegúrate de importar tus componentes aquí
import {
  Contributions,
  Taxes,
  Donnations,
  PersonnaelExpenses,
  Maintenance,
} from "../components/registerOutInternal";

const RegisterOutInternal = () => {
  const [value, setValue] = React.useState("");

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  const renderComponent = () => {
    switch (value) {
      case "Aportes":
        return <Contributions />;
      case "Impuestos":
        return <Taxes />;
      case "Donaciones":
        return <Donnations />;
      case "Gasto Personal":
        return <PersonnaelExpenses />;
      case "Mantenimiento":
        return <Maintenance />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h1>Registrar gasto de funcionamiento</h1>
      <FormControl component="fieldset">
        <RadioGroup
          row
          aria-label="category"
          name="row-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="Mantenimiento"
            control={<Radio />}
            label="Mantenimiento"
            sx={{ "& .MuiTypography-root": { fontSize: "1.2rem" } }}
          />
          <FormControlLabel
            value="Gasto Personal"
            control={<Radio />}
            label="Gasto Personal"
            sx={{ "& .MuiTypography-root": { fontSize: "1.2rem" } }}
          />
          <FormControlLabel
            value="Donaciones"
            control={<Radio />}
            label="Donaciones"
            sx={{ "& .MuiTypography-root": { fontSize: "1.2rem" } }}
          />
          <FormControlLabel
            value="Impuestos"
            control={<Radio />}
            label="Impuestos"
            sx={{ "& .MuiTypography-root": { fontSize: "1.2rem" } }}
          />
          <FormControlLabel
            value="Aportes"
            control={<Radio />}
            label="Aportes"
            sx={{ "& .MuiTypography-root": { fontSize: "1.2rem" } }}
          />
        </RadioGroup>
      </FormControl>
      {renderComponent()}
    </div>
  );
};

export default RegisterOutInternal;
