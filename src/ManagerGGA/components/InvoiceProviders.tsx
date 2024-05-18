import React from "react";
import { Grid, TextField, Autocomplete } from "@mui/material";
import { Controller, Control } from "react-hook-form";

interface Provider {
  id: string;
  name: string;
}

interface InvoiceProvidersProps {
  control: Control;
  providers: Provider[];
  setFormState: React.Dispatch<
    React.SetStateAction<{ facNDE: number; proveedor: Provider | null }>
  >;
}

export const InvoiceProviders: React.FC<InvoiceProvidersProps> = ({
  control,
  providers,
  setFormState,
}) => {
  const handleFacNDEChange = (e: any) => {
    const newFacNDE = Number(e.target.value);
    setFormState((prevState) => ({ ...prevState, facNDE: newFacNDE }));
  };

  const handleProviderChange = (field: any, _: any, value: any) => {
    field.onChange(value);
    setFormState((prevState) => ({ ...prevState, proveedor: value }));
  };

  return (
    <Grid container spacing={2} justifyContent="flex-end">
      <Grid item xs={2}>
        <TextField
          label="Fac NDE"
          variant="outlined"
          onChange={handleFacNDEChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={2}>
        <Controller
          name="provider"
          control={control}
          render={({ field }) => (
            <Autocomplete
              options={providers}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              sx={{ flexGrow: 0.15 }}
              onChange={(event, value) =>
                handleProviderChange(field, event, value)
              }
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

export default InvoiceProviders;
