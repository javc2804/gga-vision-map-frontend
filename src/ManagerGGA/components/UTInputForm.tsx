import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export const InputForm = ({ initialValues, disabled }) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="ut"
        label="UT"
        variant="outlined"
        value={values.ut}
        onChange={handleChange}
        disabled={disabled}
      />
      <TextField
        id="marca"
        label="Marca"
        variant="outlined"
        value={values.marca}
        onChange={handleChange}
        disabled={disabled}
      />
      <TextField
        id="modelo"
        label="Modelo"
        variant="outlined"
        value={values.modelo}
        onChange={handleChange}
        disabled={disabled}
      />
      <TextField
        id="eje"
        label="Eje"
        variant="outlined"
        value={values.eje}
        onChange={handleChange}
        disabled={disabled}
      />
      <TextField
        id="subeje"
        label="Subeje"
        variant="outlined"
        value={values.subeje}
        onChange={handleChange}
        disabled={disabled}
      />
    </Box>
  );
};

export default InputForm;
