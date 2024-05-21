import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useDispatch } from "react-redux";
import { setPricesCompromises } from "../../../../../store/compromises/newCompromisesSlices";
interface PricesCompromisesProps {
  pricesCompromisesState: {
    quantity: string;
    price: string;
    total: string;
    description: string;
    orderNumber: string;
    date: string;
    observation: string;
  };
  setPricesCompromisesState: React.Dispatch<
    React.SetStateAction<{
      quantity: string;
      price: string;
      total: string;
      description: string;
      orderNumber: string;
      date: string;
      observation: string;
    }>
  >;
}

export const PricesCompromises: React.FC<PricesCompromisesProps> = ({
  pricesCompromisesState,
  setPricesCompromisesState,
}) => {
  const dispatch = useDispatch();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case "description":
        setDescription(value);
        break;
      case "quantity":
        setQuantity(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "total":
        setTotal(value);
        break;
      case "orderNumber":
        setOrderNumber(value);
        break;
      case "observation":
        setObservation(value);
        break;
      default:
        break;
    }
    setPricesCompromisesState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
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

  useEffect(() => {
    dispatch(
      setPricesCompromises({
        quantity,
        price,
        total,
        description,
        orderNumber,
        date,
        observation,
        compromises: [],
      })
    );
  }, [quantity, price, total, description, orderNumber, date, observation]);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TextField
        name="description"
        label="Descripción"
        variant="outlined"
        margin="normal"
        value={description}
        onChange={handleChange}
        style={{ marginRight: "20px" }}
      />
      <TextField
        name="quantity"
        label="Cantidad"
        variant="outlined"
        margin="normal"
        type="number"
        value={quantity}
        onChange={handleChange}
        onBlur={(e) => {
          const newValue = Number(e.target.value);
          setQuantity(
            isNaN(newValue) || newValue <= 0 ? "0" : String(newValue)
          );
        }}
        style={{ marginRight: "20px" }}
      />
      <TextField
        name="price"
        label="Precio unitario en $ deuda"
        variant="outlined"
        margin="normal"
        type="number"
        value={price}
        onChange={handleChange}
        onBlur={(e) => {
          const newValue = Number(e.target.value);
          setPrice(isNaN(newValue) || newValue <= 0 ? "0" : String(newValue));
        }}
        style={{ marginRight: "20px" }}
      />
      <TextField
        name="total"
        label="Monto total en $ deuda"
        variant="outlined"
        margin="normal"
        type="number"
        value={total}
        onChange={handleChange}
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
        name="orderNumber"
        label="Nº de Orden de Pago"
        variant="outlined"
        margin="normal"
        value={orderNumber}
        onChange={handleChange}
        style={{ marginRight: "20px" }}
      />
      <TextField
        name="observation"
        label="Observación"
        variant="outlined"
        margin="normal"
        value={observation}
        onChange={handleChange}
        style={{ marginRight: "20px" }}
      />
    </LocalizationProvider>
  );
};

export default PricesCompromises;
