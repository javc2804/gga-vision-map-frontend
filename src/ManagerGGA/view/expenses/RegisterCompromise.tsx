import React, { useState } from "react";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import {
  NewCompromise,
  PayCompromise,
  DetailCompromise,
} from "../../components/registerCompromise/";
import { useSelector } from "react-redux";
import { RootState as StoreRootState } from "../../../store/store";

interface RegisterCompromiseProps {
  selectedValueProp: string;
  params: any;
}

export const RegisterCompromise: React.FC<RegisterCompromiseProps> = ({
  selectedValueProp,
  params,
}) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedValue(event.target.value);
  };

  const [selectedValue, setSelectedValue] = useState(selectedValueProp || "");
  const combinedData = useSelector(
    (state: StoreRootState) => state.purchase.purchase
  );

  let Component;
  switch (selectedValue) {
    case "new":
      Component = <NewCompromise combinedData={combinedData} params={params} />;
      break;
    case "pay":
      Component = <PayCompromise combinedData={combinedData} params={params} />;
      break;
    // case "detail":
    //   Component = <DetailCompromise combinedData={combinedData} />;
    //   break;
    default:
      Component = null;
  }

  return (
    <div>
      <Select displayEmpty value={selectedValue} onChange={handleChange}>
        <MenuItem value="">Selecciona tipo</MenuItem>
        <MenuItem value={"new"}>
          {!params ? "Registrar nuevo" : "Editar Compromiso"}
        </MenuItem>
        {params ? <MenuItem value={"pay"}>Pagar Compromiso</MenuItem> : null}
        {/* <MenuItem value={"detail"}>Detalle Compromiso</MenuItem> */}
      </Select>
      {Component}
    </div>
  );
};

export default RegisterCompromise;
