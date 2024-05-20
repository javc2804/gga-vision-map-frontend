import { Controller } from "react-hook-form";
import { TextField, Grid, Autocomplete } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";

interface CompromiseProviderProps {
  spareParts: any;
  sparePartVariants: any;
}

export const SpartsPayCompromise: React.FC<CompromiseProviderProps> = ({
  spareParts,
  sparePartVariants,
}) => {
  const methods = useForm();
  const { control } = methods;
  const [values, setValues] = useState({
    repuesto: "",
    descripcionRepuesto: "",
  });

  return (
    <FormProvider {...methods}>
      <Grid container spacing={2} style={{ width: "40%" }}>
        <Grid item xs={12} sm={6} md={4}>
          <Controller
            name="repuesto"
            control={control}
            rules={{ required: "Repuesto es requerido" }}
            render={({ field }) => (
              <Autocomplete
                {...field}
                value={field.value || null}
                options={spareParts}
                getOptionLabel={(option) => (option ? option.type : "")}
                isOptionEqualToValue={(option, value) =>
                  option.title === value.title
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Repuesto"
                    variant="outlined"
                    fullWidth
                  />
                )}
                onChange={(_, data) => {
                  field.onChange(data);
                  if (data) {
                    setValues({
                      ...values,
                      repuesto: data.type,
                    });
                  } else {
                    setValues({
                      ...values,
                      repuesto: "",
                    });
                  }
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Controller
            name="descripcionRepuesto"
            control={control}
            rules={{ required: "Descripción repuesto es requerido" }}
            render={({ field }) => (
              <Autocomplete
                {...field}
                value={field.value || ""}
                options={sparePartVariants}
                getOptionLabel={(option) => (option ? option.variant : "")}
                isOptionEqualToValue={(option, value) =>
                  option.title === value.title
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Descripción Repuesto"
                    variant="outlined"
                    fullWidth
                  />
                )}
                onChange={(_, data) => {
                  field.onChange(data); // Esto es necesario para que react-hook-form rastree los cambios
                  if (data) {
                    setValues({
                      ...values,
                      descripcionRepuesto: data.variant,
                    });
                  } else {
                    setValues({
                      ...values,
                      descripcionRepuesto: "",
                    });
                  }
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Controller
            name="formaDePago"
            control={control}
            rules={{ required: "Forma de pago es requerido" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Crédito"
                variant="outlined"
                fullWidth
                defaultValue="credito"
                disabled
              />
            )}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default SpartsPayCompromise;
