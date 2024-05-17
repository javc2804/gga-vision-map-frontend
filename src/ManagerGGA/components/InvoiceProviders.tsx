import { Box, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import { useInvoiceProviders } from "../hooks/useInvoiceProviders";
import { Control } from "react-hook-form";

const boxStylesContainer = {
  display: "flex",
  justifyContent: "flex-end",
  mb: 2,
  mr: 4,
  mt: 3,
};

interface Provider {
  id: string;
  name: string;
}

interface InvoiceProvidersProps {
  control: Control;
  providers: Provider[];
}

export const InvoiceProviders: React.FC<InvoiceProvidersProps> = ({
  control,
  providers,
}) => {
  const initialState = {
    facNDE: 0,
    proveedor: null,
  };

  const { formState, handleFacNDEChange, handleProviderChange } =
    useInvoiceProviders(initialState);
  console.log(formState);

  return (
    <Box sx={boxStylesContainer}>
      <TextField
        label="No Fac/NDE"
        variant="outlined"
        sx={{ mr: 1 }}
        value={formState.facNDE || ""}
        onChange={handleFacNDEChange}
      />
      <Controller
        name="proveedor"
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <Autocomplete
            id="proveedor"
            options={providers}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            sx={{ flexGrow: 0.15 }}
            onChange={(event, value) =>
              handleProviderChange(field, event, value)
            }
            value={field.value}
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
    </Box>
  );
};

export default InvoiceProviders;
