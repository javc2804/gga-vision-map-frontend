import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
type InitialValuesType = {
  ut: string;
  marcaModelo: string;
  eje: string;
  subeje: string;
};
export const InputForm = ({
  initialValues = [],
  fleets,
  disabled,
  onChange,
}) => {
  const [values, setValues] = useState({
    ut: initialValues.length > 0 ? initialValues[0].ut : "",
    marcaModelo: initialValues.length > 0 ? initialValues[0].marcaModelo : "",
    eje: initialValues.length > 0 ? initialValues[0].eje : "",
    subeje: initialValues.length > 0 ? initialValues[0].subeje : "",
  });

  useEffect(() => {
    if (typeof onChange === "function") {
      if (JSON.stringify(values) !== JSON.stringify(initialValues)) {
        onChange(values);
      }
    }
  }, [values, onChange, initialValues]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  const handleAutoCompleteChange = (field) => (event, newValue) => {
    const selectedUt = fleets.find((item) => item.ut === newValue);
    setValues({
      ...values,
      [field]: newValue,
      marcaModelo: selectedUt ? selectedUt.marcaModelo : "",
      eje: selectedUt ? selectedUt.eje : "",
      subeje: selectedUt ? selectedUt.subeje : "",
    });
  };

  const utOptions = fleets.map((item) => item.ut);

  return (
    <Box component="form" noValidate autoComplete="off">
      <Grid container spacing={2}>
        <Grid item>
          <Autocomplete
            id="ut"
            options={utOptions}
            value={utOptions.includes(values.ut) ? values.ut : null}
            onChange={handleAutoCompleteChange("ut")}
            isOptionEqualToValue={(option, value) => option === value}
            renderInput={(params) => (
              <TextField
                {...params}
                label="UT"
                variant="outlined"
                disabled={disabled}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item>
          <TextField
            id="marcaModelo"
            label="Marca/Model"
            variant="outlined"
            value={values.marcaModelo}
            onChange={handleChange}
            disabled={true}
            fullWidth
          />
        </Grid>

        <Grid item>
          <TextField
            id="eje"
            label="Eje"
            variant="outlined"
            value={values.eje}
            onChange={handleChange}
            disabled={true}
            fullWidth
          />
        </Grid>
        <Grid item>
          <TextField
            id="subeje"
            label="Sub-eje"
            variant="outlined"
            value={values.subeje}
            onChange={handleChange}
            disabled={true}
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default InputForm;
