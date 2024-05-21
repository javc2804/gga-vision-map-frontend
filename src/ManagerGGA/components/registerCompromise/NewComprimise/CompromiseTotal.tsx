import { Button, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

const CompromiseTotal = () => {
  const deudas = useSelector(
    (state: RootState) => state.compromises.compromises
  );
  const compromiseProvider = useSelector(
    (state: RootState) => state.compromises
  );

  const handleSave = () => {
    console.log(compromiseProvider);
    console.log(deudas);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      <TextField
        label="Monto total deuda $"
        variant="outlined"
        margin="normal"
        type="number"
      />
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "10px" }}
        onClick={handleSave}
      >
        Guardar
      </Button>
    </div>
  );
};

export default CompromiseTotal;
