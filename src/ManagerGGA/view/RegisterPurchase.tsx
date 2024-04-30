import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AddOutlined } from "@mui/icons-material";
import {
  Box,
  IconButton,
  TextField,
  Fab,
  Stack,
  SpeedDial,
  SpeedDialAction,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useState } from "react";
const actions = [
  { icon: <AddOutlined />, name: "Button 1" },
  { icon: <AddOutlined />, name: "Button 2" },
  { icon: <AddOutlined />, name: "Button 3" },
  { icon: <AddOutlined />, name: "Button 4" },
  { icon: <AddOutlined />, name: "Button 5" },
];
const RegisterPurchase = () => {
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [orderDate, setOrderDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "50ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField label="Número de registro" variant="outlined" />
        <TextField label="IDUT" variant="outlined" />
        <TextField
          label="Número de factura o nota de entrega"
          variant="outlined"
        />
        <TextField label="Registro proveedor" variant="outlined" />
        <TextField label="Repuestos" variant="outlined" />
        <TextField label="Forma de pago" variant="outlined" />
        <TextField label="Descripción" variant="outlined" />
        <TextField label="Cantidad" variant="outlined" />
        <TextField label="Precio unitario en bolívares" variant="outlined" />
        <TextField label="Tasa BCV" variant="outlined" />
        <TextField label="Precio unitario en divisas" variant="outlined" />
        <TextField
          label="Monto total del pago en bolívares"
          variant="outlined"
        />
        <TextField label="Monto total en divisas deuda" variant="outlined" />
        <TextField label="Precio unitario en divisas" variant="outlined" />
        <TextField label="Monto total del pago en divisas" variant="outlined" />
        <DateTimePicker
          label="Fecha de entrega"
          inputFormat="dd/MM/yyyy HH:mm"
          value={deliveryDate}
          onChange={setDeliveryDate}
          components={{
            textField: TextField,
          }}
        />
        <DateTimePicker
          label="Fecha de pago"
          inputFormat="dd/MM/yyyy HH:mm"
          value={paymentDate}
          onChange={setPaymentDate}
          components={{
            textField: TextField,
          }}
        />
        <TextField label="Número de orden de pago" variant="outlined" />
        <TextField label="Orden de compra o servicio" variant="outlined" />
        <DateTimePicker
          label="Fecha de orden de compra o servicio"
          inputFormat="dd/MM/yyyy HH:mm"
          value={orderDate}
          onChange={setOrderDate}
          components={{
            textField: TextField,
          }}
        />
        <TextField label="Número de nota de entrega" variant="outlined" />
        <TextField label="Estatus" variant="outlined" />
        <TextField label="Observación" variant="outlined" multiline rows={4} />
        {/* <IconButton
          size="large"
          sx={{
            color: "white",
            backgroundColor: "#17dbeb",
            ":hover": { backgroundColor: "#17dbeb", opacity: 0.9 },
            position: "fixed",
            right: 50,
            bottom: 50,
          }}
        >
          <AddOutlined sx={{ fontSize: 30 }} />
        </IconButton> */}
        <Stack
          direction="row"
          spacing={2}
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
          }}
        >
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: "absolute", bottom: 16, right: 16 }}
            icon={<AddOutlined />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            direction="up"
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={handleClose}
              />
            ))}
          </SpeedDial>
        </Stack>
      </Box>
    </LocalizationProvider>
  );
};

export default RegisterPurchase;
