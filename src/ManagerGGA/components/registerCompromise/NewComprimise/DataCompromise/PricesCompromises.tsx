import { TextField } from "@mui/material";
import { useState, useEffect } from "react";

export const PricesCompromises = () => {
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [total, setTotal] = useState("");

  useEffect(() => {
    if (quantity && price) {
      const totalValue = (parseFloat(quantity) * parseFloat(price)).toFixed(2);
      setTotal(totalValue);
    }
  }, [quantity, price]);

  return (
    <div>
      <TextField
        label="Descripción"
        variant="outlined"
        margin="normal"
        style={{ marginRight: "20px" }}
      />
      <TextField
        label="Cantidad"
        variant="outlined"
        margin="normal"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        style={{ marginRight: "20px" }}
      />
      <TextField
        label="Precio unitario en $ deuda"
        variant="outlined"
        margin="normal"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{ marginRight: "20px" }}
      />
      <TextField
        label="Monto total en $ deuda"
        variant="outlined"
        margin="normal"
        type="number"
        value={total}
        onChange={(e) => setTotal(e.target.value)}
        style={{ marginRight: "20px" }}
      />
      <TextField
        label="Fecha OC/OS"
        variant="outlined"
        margin="normal"
        type="date"
        InputLabelProps={{ shrink: true }}
        style={{ marginRight: "20px" }}
      />
      <TextField
        label="Nº de Orden de Pago"
        variant="outlined"
        margin="normal"
        style={{ marginRight: "20px" }}
      />
      <TextField
        label="Observación"
        variant="outlined"
        margin="normal"
        style={{ marginRight: "20px" }}
      />
    </div>
  );
};

export default PricesCompromises;
