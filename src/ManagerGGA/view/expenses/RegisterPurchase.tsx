import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { Button, Box, TextField, Autocomplete } from "@mui/material";
import { UTInputForm, PaymentForm } from "../../components/";
import { startGetPurchase } from "../../../store/purchase/purchaseThunks";
import { useSnackbar } from "../../../hooks/useSnackBar";
import { ErrorOutline, CheckCircle } from "@mui/icons-material";

export const RegisterPurchase = () => {
  const { SnackbarComponent, openSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const purchaseData = useSelector((state) => state.purchase);
  const fleets = purchaseData.purchase?.response?.fleets || [];
  const providers = purchaseData.purchase?.response?.providers || [];
  const spareParts = purchaseData.purchase?.response?.spareParts || [];
  const sparePartVariants =
    purchaseData.purchase?.response?.sparePartVariants || [];
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
      openSnackbar(
        `Error al guardar, verifica el campo ${errorField}`,
        "error",
        ErrorOutline
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
      openSnackbar(
        `Error al guardar, verifica el campo ${errorField}`,
        "error",
        ErrorOutline
      );
      return;
    }

    if (facNDE === "0" || "") {
      openSnackbar(
        `Error al guardar, Fac/NDE debe estar lleno y distinto a 0`,
        "error",
        ErrorOutline
      );
      return;
    }

    openSnackbar("Guardado exitosamente", "success", CheckCircle);
    console.log(combinedForms);
  };

  const handleInputChange = useCallback(
    (id) => (newValues, newErrors) => {
      setForms((prevForms) =>
        prevForms.map((form) =>
          form.id === id
            ? { ...form, input: newValues, errors: newErrors }
            : form
        )
      );
    },
    [setForms]
  );

  const handlePaymentChange = useCallback(
    (id) => (newValues, newErrors) => {
      setForms((prevForms) => {
        let totalUsd = 0;
        let totalBs = 0;

        const newForms = prevForms.map((form) => {
          if (form.id === id) {
            totalUsd += parseFloat(newValues.montoTotalUsd);
            totalBs += parseFloat(newValues.montoTotalBs);
            return { ...form, payment: newValues, errors: newErrors };
          } else {
            totalUsd += parseFloat(form.payment.montoTotalUsd);
            totalBs += parseFloat(form.payment.montoTotalBs);
            return form;
          }
        });

        setTotalFactUsd(totalUsd);
        setTotalFactBs(totalBs);

        return newForms;
      });
    },
    [setForms]
  );

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
          defaultValue={null}
          render={({ field }) => (
            <Autocomplete
              id="proveedor"
              options={providers}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              sx={{ flexGrow: 0.15 }}
              onChange={(event, value) => {
                field.onChange(value);
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
          <UTInputForm
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
      {SnackbarComponent}
    </>
  );
};

export default RegisterPurchase;
