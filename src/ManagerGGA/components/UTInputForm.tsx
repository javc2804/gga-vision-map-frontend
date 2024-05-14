import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";

export const InputForm = ({ initialValues, disabled, onChange }) => {
  const [values, setValues] = useState({
    ...initialValues,
    ut: initialValues.ut ? initialValues.ut : null,
  });

  useEffect(() => {
    if (typeof onChange === "function") {
      onChange(values);
    }
  }, [values, onChange]);
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  const handleAutoCompleteChange = (field) => (event, newValue) => {
    setValues({
      ...values,
      [field]: newValue,
    });
  };

  const utOptions = ["001", "002"];

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Autocomplete
        id="ut"
        options={utOptions}
        value={values.ut}
        onChange={handleAutoCompleteChange("ut")}
        renderInput={(params) => (
          <TextField
            {...params}
            label="UT"
            variant="outlined"
            disabled={disabled}
          />
        )}
      />
      <TextField
        id="marca"
        label="Marca"
        variant="outlined"
        value={values.marca}
        onChange={handleChange}
        disabled={true}
      />
      <TextField
        id="modelo"
        label="Modelo"
        variant="outlined"
        value={values.modelo}
        onChange={handleChange}
        disabled={true}
      />
      <TextField
        id="eje"
        label="Eje"
        variant="outlined"
        value={values.eje}
        onChange={handleChange}
        disabled={true}
      />
      <TextField
        id="subeje"
        label="Sub-eje"
        variant="outlined"
        value={values.subeje}
        onChange={handleChange}
        disabled={true}
      />
    </Box>
  );
};

export default InputForm;