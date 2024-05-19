import { Autocomplete, Grid, TextField } from "@mui/material";
import { Controller, Control, useForm } from "react-hook-form";

interface CompromiseProviderProps {
  proveedor: any;
}

export const CompromiseProvider: React.FC<CompromiseProviderProps> = ({
  proveedor,
}) => {
  const { control } = useForm();

  console.log(proveedor);
  return (
    <Grid container spacing={2} justifyContent="flex-end">
      <Grid item xs={2}>
        <TextField label="NDE" variant="outlined" fullWidth />
      </Grid>
      <Grid item xs={2}>
        <TextField label="Compromiso" variant="outlined" fullWidth />
      </Grid>
      <Grid item xs={2}>
        <Controller
          name="provider"
          control={control}
          render={({ field }) => (
            <Autocomplete
              options={proveedor}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              sx={{ flexGrow: 0.15 }}
              onChange={(event, value) => {
                // Completa el evento 'onChange' aquí
                console.log(value);
              }}
              value={field.value || null} // Asegúrate de que el valor no sea undefined
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Registro Proveedor"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default CompromiseProvider;
