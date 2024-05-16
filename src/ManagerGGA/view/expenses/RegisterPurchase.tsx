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
import { Controller, useForm } from "react-hook-form";

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
    marcaModelo: "",
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
    proveedor: null,
  };

  useEffect(() => {
    dispatch(startGetPurchase());
  }, [dispatch]);

  const { control } = useForm();

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
  const [proveedor, setProveedor] = useState(null);

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
      form.payment.facNDE = facNDE;
      form.payment.proveedor = proveedor;
      return {
        id: form.id,
        ...form.input,
        ...form.payment,
        errors: form.errors,
      };
    });

    let errorField = null;
    const hasErrors = forms.some((form) => {
      const requiredFields = [
        "facNDE",
        "proveedor",
        "cantidad",
        "montoTotalBs",
        "montoTotalUsd",
        "numeroOrdenPago",
        "precioUnitarioBs",
        "precioUnitarioUsd",
        "tasaBcv",
        "repuesto",
        "descripcionRepuesto",
        "fechaOcOs",
      ];

      return requiredFields.some((field) => {
        const hasError = !form.payment[field] || form.payment[field] === null;
        if (hasError) {
          errorField = field;
        }
        return hasError;
      });
    });

    if (hasErrors) {
      handleSnackbarOpen(
        `Error al guardar, verifica el campo ${errorField}`,
        "error"
      );
      return;
    }
    const hasErrorsUt = forms.some((form) => {
      const requiredFields = ["ut"];

      return requiredFields.some((field) => {
        const hasError = !form.input[field] || form.input[field] === null;
        if (hasError) {
          errorField = field;
        }
        return hasError;
      });
    });

    if (hasErrorsUt) {
      handleSnackbarOpen(
        `Error al guardar, verifica el campo ${errorField}`,
        "error"
      );
      return;
    }

    if (facNDE === "0" || "") {
      handleSnackbarOpen(
        `Error al guardar, Fac/NDE debe estar lleno y distinto a 0`,
        "error"
      );
      return;
    }

    handleSnackbarOpen("Guardado con éxito", "success");
    console.log(combinedForms);
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
        <Controller
          name="proveedor"
          control={control}
          defaultValue={null} // Asegúrate de que el valor inicial no sea `undefined`
          render={({ field }) => (
            <Autocomplete
              id="proveedor"
              options={providers}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id} // Asegúrate de que las opciones se comparan correctamente
              sx={{ flexGrow: 0.15 }}
              onChange={(event, value) => {
                field.onChange(value);
                // Actualiza el estado del proveedor con el valor seleccionado
                setProveedor(value);
              }}
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
            initialValues={form.input}
            fleets={fleets}
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
