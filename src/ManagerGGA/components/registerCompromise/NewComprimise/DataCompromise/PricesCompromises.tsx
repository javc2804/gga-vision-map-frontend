import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export const PricesCompromises = () => {
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [total, setTotal] = useState("");
  const [description, setDescription] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [observation, setObservation] = useState("");

  useEffect(() => {
    if (quantity && price) {
      const totalValue = (parseFloat(quantity) * parseFloat(price)).toFixed(2);
      setTotal(totalValue);
    }
  }, [quantity, price]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TextField
        label="Descripción"
        variant="outlined"
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ marginRight: "20px" }}
      />
      <TextField
        label="Cantidad"
        variant="outlined"
        margin="normal"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        onBlur={(e) => {
          const newValue = Number(e.target.value);
          setQuantity(
            isNaN(newValue) || newValue <= 0 ? "0" : String(newValue)
          );
        }}
        style={{ marginRight: "20px" }}
      />
      <TextField
        label="Precio unitario en $ deuda"
        variant="outlined"
        margin="normal"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        onBlur={(e) => {
          const newValue = Number(e.target.value);
          setPrice(isNaN(newValue) || newValue <= 0 ? "0" : String(newValue));
        }}
        style={{ marginRight: "20px" }}
      />
      <TextField
        label="Monto total en $ deuda"
        variant="outlined"
        margin="normal"
        type="number"
        value={total}
        onChange={(e) => setTotal(e.target.value)}
        onBlur={(e) => {
          const newValue = Number(e.target.value);
          setTotal(isNaN(newValue) || newValue <= 0 ? "0" : String(newValue));
        }}
        style={{ marginRight: "20px" }}
      />
      <DatePicker
        label="Fecha OC/OS"
        format="dd/MM/yyyy"
        value={date}
        onChange={(newValue) => setDate(newValue)}
        renderInput={(params: any) => (
          <TextField
            {...params}
            variant="outlined"
            margin="normal"
            style={{ marginRight: "20px" }}
          />
        )}
      />
      <TextField
        label="Nº de Orden de Pago"
        variant="outlined"
        margin="normal"
        value={orderNumber}
        onChange={(e) => setOrderNumber(e.target.value)}
        style={{ marginRight: "20px" }}
      />
      <TextField
        label="Observación"
        variant="outlined"
        margin="normal"
        value={observation}
        onChange={(e) => setObservation(e.target.value)}
        style={{ marginRight: "20px" }}
      />
    </LocalizationProvider>
  );
};

export default PricesCompromises;
