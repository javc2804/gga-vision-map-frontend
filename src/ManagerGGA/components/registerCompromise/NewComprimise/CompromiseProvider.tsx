import { useDispatch } from "react-redux";
import { compromiseProvider } from "../../../../store/compromises/newCompromisesSlices";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { TextField, Grid, Autocomplete } from "@mui/material";
import { useForm } from "react-hook-form";
interface CompromiseProviderProps {
  proveedor: any;
}

export const CompromiseProvider: React.FC<CompromiseProviderProps> = ({
  proveedor,
}) => {
  const [nde, setNde] = useState(0);
  const [compromiso, setCompromiso] = useState("");
  const [provider, setProvider] = useState("");

  const { control } = useForm();
  const dispatch = useDispatch();

  const handleNDEChange = (value: any) => {
    const numberValue = Number(value);
    if (!isNaN(numberValue)) {
      setNde((prevNde) => {
        const newNde = numberValue;
        dispatch(compromiseProvider({ nde: newNde, compromiso, provider }));
        return newNde;
      });
    }
  };

  const handleCompromiseChange = (value: any) => {
    setCompromiso((prevCompromiso) => {
      const newCompromiso = value;
      dispatch(
        compromiseProvider({ nde, compromiso: newCompromiso, provider })
      );
      return newCompromiso;
    });
  };

  const handleProviderChange = (value: any) => {
    setProvider((prevProvider) => {
      const newProvider = value;
      dispatch(compromiseProvider({ nde, compromiso, provider: newProvider }));
      return newProvider;
    });
  };

  return (
    <Grid container spacing={2} justifyContent="flex-end">
      <Grid item xs={2}>
        <TextField
          label="NDE"
          variant="outlined"
          fullWidth
          onChange={(e) => handleNDEChange(e.target.value)}
        />{" "}
      </Grid>
      <Grid item xs={2}>
        <TextField
          label="Compromiso"
          variant="outlined"
          onChange={(e) => handleCompromiseChange(e.target.value)}
          fullWidth
        />
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
              onChange={(_: any, value: any) => {
                handleProviderChange(value.name);
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
