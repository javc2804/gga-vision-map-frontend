import React, { useEffect, useState } from "react";
import InputForm from "../../components/UTInputForm";
import PaymentForm from "../../components/PaymentForm";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { startGetPurchase } from "../../../store/purchase/purchaseThunks";
import Autocomplete from "@mui/material/Autocomplete";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return <MuiAlert elevation={6} variant="filled" ref={ref} {...props} />;
});

export const RegisterPurchase = () => {
  const dispatch = useDispatch();
  const purchaseData = useSelector((state) => state.purchase); // Reemplaza 'purchase' con el nombre de la rebanada de estado que contiene los datos de la compra
  const fleets = purchaseData.purchase?.response?.fleets || []; // Accedemos a la propiedad fleets
  const providers = purchaseData.purchase?.response?.providers || []; // Accedemos a la propiedad fleets
  const spareParts = purchaseData.purchase?.response?.spareParts || []; // Accedemos a la propiedad fleets
  const sparePartVariants =
    purchaseData.purchase?.response?.sparePartVariants || []; // Accedemos a la propiedad fleets
  const initialValuesInput = {
    ut: "",
    marca: "",
    modelo: "",
    eje: "",
    subeje: "",
  };

  const initialValuesPayment = {
    repuesto: null,
    descripcionRepuesto: null,
    formaPago: "Contado",
    descripcion: "",
    cantidad: "",
    precioUnitarioBs: "",
    tasaBcv: "",
    precioUnitarioUsd: "",
    montoTotalUsd: "",
    montoTotalBs: "",
    ocOs: "",
    fechaOcOs: null,
    numeroOrdenPago: "",
    observacion: "",
    facNDE: 0,
  };

  useEffect(() => {
    dispatch(startGetPurchase());
  }, [dispatch]);

  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [nextId, setNextId] = useState(1);
  const [forms, setForms] = useState([
    {
      id: 0,
      input: initialValuesInput,
      payment: initialValuesPayment,
      errors: {},
    },
  ]);

  const [totalFactUsd, setTotalFactUsd] = useState(0);
  const [totalFactBs, setTotalFactBs] = useState(0);
  const [facNDE, setFacNDE] = useState(0);

  const handleAddClick = () => {
    setForms([
      ...forms,
      {
        id: nextId,
        input: initialValuesInput,
        payment: initialValuesPayment,
        errors: {},
      },
    ]);
    setNextId(nextId + 1);
  };

  const handleRemoveClick = (id) => {
    const list = forms.filter((form) => form.id !== id);
    setForms(list);
  };
  const handleSnackbarOpen = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpen(true);
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSaveClick = () => {
    const combinedForms = forms.map((form) => {
      // Asegúrate de que el campo 'precioUnitarioBs' no esté vacío
      if (!form.payment.precioUnitarioBs) {
        form.errors.precioUnitarioBs = "El campo precio no puede estar vacío";
      }

      return {
        id: form.id,
        ...form.input,
        ...form.payment,
        errors: form.errors,
      };
    });

    const hasErrors = combinedForms.some((form) => {
      form.facNDE = facNDE;
      return form.errors && Object.keys(form.errors).length > 0;
    });

    if (hasErrors) {
      handleSnackbarOpen("Error al guardar, verifica el formulario", "error");
      return;
    }

    console.log(combinedForms);

    handleSnackbarOpen("Guardado con éxito", "success");
  };

  const handleInputChange = (id) => (newValues, newErrors) => {
    const newForms = forms.map((form) => {
      if (form.id === id) {
        if (
          JSON.stringify(form.input) !== JSON.stringify(newValues) ||
          JSON.stringify(form.errors) !== JSON.stringify(newErrors)
        ) {
          return { ...form, input: newValues, errors: newErrors };
        }
      }
      return form;
    });

    if (JSON.stringify(forms) !== JSON.stringify(newForms)) {
      setForms(newForms);
    }
  };

  const handlePaymentChange = (id) => (newValues, newErrors) => {
    setForms((prevForms) => {
      const newForms = prevForms.map((form) => {
        if (form.id === id) {
          if (
            JSON.stringify(form.payment) !== JSON.stringify(newValues) ||
            JSON.stringify(form.errors) !== JSON.stringify(newErrors)
          ) {
            return { ...form, payment: newValues, errors: newErrors };
          }
        }
        return form;
      });
      const totalUsd = newForms.reduce(
        (sum, form) =>
          sum +
          (form.payment?.montoTotalUsd
            ? parseFloat(form.payment.montoTotalUsd)
            : 0),
        0
      );
      const totalBs = newForms.reduce(
        (sum, form) =>
          sum +
          (form.payment?.montoTotalBs
            ? parseFloat(form.payment.montoTotalBs)
            : 0),
        0
      );
      setTotalFactUsd(totalUsd);
      setTotalFactBs(totalBs);

      return newForms;
    });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 2,
          mr: 4,
          mt: 3,
        }}
      >
        <TextField
          label="No Fac/NDE"
          variant="outlined"
          sx={{ mr: 1 }}
          value={facNDE || ""}
          onChange={(e) => setFacNDE(e.target.value)}
        />
        <Autocomplete
          id="provider"
          options={providers}
          getOptionLabel={(option) => option.name}
          sx={{ flexGrow: 0.15 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Registro Proveedor"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </Box>
      {forms.map((form, index) => (
        <Box
          key={form.id}
          sx={{
            p: 4,
            mb: 4,
            mr: 4,
            mt: 2,
            ml: 2,
            borderRadius: 4,
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.45)",
          }}
        >
          <InputForm
            initialValues={fleets}
            disabled={false}
            onChange={handleInputChange(form.id)}
          />
          <PaymentForm
            initialValues={form.payment}
            onChange={handlePaymentChange(form.id)}
            spareParts={spareParts}
            sparePartVariants={sparePartVariants}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            {forms.length > 1 && (
              <Button
                variant="contained"
                color="error"
                onClick={() => handleRemoveClick(form.id)}
                sx={{ mr: 1 }}
              >
                Borrar
              </Button>
            )}
            {index === forms.length - 1 && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddClick}
              >
                Agregar
              </Button>
            )}
          </Box>
        </Box>
      ))}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, mr: 3.7 }}>
        <TextField
          label="Total factura $"
          variant="outlined"
          sx={{ mr: 1 }}
          value={totalFactUsd}
          onChange={(e) => setTotalFactUsd(e.target.value)}
        />
        <TextField
          label="Total factura Bs"
          variant="outlined"
          sx={{ mr: 1 }}
          value={totalFactBs}
          onChange={(e) => setTotalFactBs(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSaveClick}>
          Guardar
        </Button>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default RegisterPurchase;
