import React, { useState } from "react";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";

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

  const [selectedValue, setSelectedValue] = useState(selectedValueProp);

  return (
    <div>
      <Select value={selectedValue} onChange={handleChange}>
        <MenuItem value={"new"}>Registrar nuevo</MenuItem>
        <MenuItem value={"pay"}>Pagar Compromiso</MenuItem>
        <MenuItem value={"detail"}>Detalle Compromiso</MenuItem>
        <MenuItem value={"compromise"}>Compromise</MenuItem>
      </Select>
    </div>
  );
};

export default RegisterCompromise;
