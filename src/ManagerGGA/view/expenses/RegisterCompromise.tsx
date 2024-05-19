import React, { useState } from "react";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import {
  NewCompromise,
  PayCompromise,
  DetailCompromise,
} from "../../components/registerCompromise/";

interface RegisterCompromiseProps {
  selectedValueProp: string;
  setSelectedValueProp: React.Dispatch<React.SetStateAction<string>>;
}

export const RegisterCompromise: React.FC<RegisterCompromiseProps> = ({
  selectedValueProp,
  setSelectedValueProp,
}) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedValue(event.target.value);
  };

  const [selectedValue, setSelectedValue] = useState(selectedValueProp || "");

  let Component;
  switch (selectedValue) {
    case "new":
      Component = NewCompromise;
      break;
    case "pay":
      Component = PayCompromise;
      break;
    case "detail":
      Component = DetailCompromise;
      break;
    default:
      Component = () => null;
  }

  return (
    <div>
      <Select displayEmpty value={selectedValue} onChange={handleChange}>
        <MenuItem value="">Selecciona tipo</MenuItem>
        <MenuItem value={"new"}>Registrar nuevo</MenuItem>
        <MenuItem value={"pay"}>Pagar Compromiso</MenuItem>
        <MenuItem value={"detail"}>Detalle Compromiso</MenuItem>
      </Select>
      <Component />
    </div>
  );
};

export default RegisterCompromise;
