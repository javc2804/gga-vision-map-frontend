import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState as StoreRootState } from "../../../store/store";
import { Controller, useForm } from "react-hook-form";
import { Button, Box, TextField, Autocomplete } from "@mui/material";
import { UTInputForm, PaymentForm, InvoiceTotals } from "../../components/";
import { startGetPurchase } from "../../../store/purchase/purchaseThunks";
import { useSnackbar } from "../../../hooks/useSnackBar";
import { ErrorOutline, CheckCircle } from "@mui/icons-material";
import {
  selectPurchase,
  selectLoading,
  selectError,
  selectSaveStatus,
  selectDeliveryDate,
  selectPaymentDate,
  selectOrderDate,
  selectRepuestos,
  selectFormaDePago,
  selectUt,
} from "../../../store/purchase/purchaseSlice";

import useMultipleForm from "../../hooks/useMultipleForm";

interface RootState {
  purchase: {
    purchase: {
      response: {
        fleets: any[];
        providers: any[];
        spareParts: any[];
        sparePartVariants: any[];
      };
    };
  };
}

interface ResponseType {
  fleets?: any[];
  providers?: any[];
  spareParts?: any[];
  sparePartVariants?: any[];
}

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

export const RegisterPurchase = () => {
  const dispatch = useDispatch();

  const { control } = useForm();

  const [formState, setFormState] = useState({ facNDE: 0, proveedor: null });

  const { SnackbarComponent, openSnackbar } = useSnackbar();
  const {
    forms,
    handleAddClick,
    handleRemoveClick,
    handleInputChange,
    handlePaymentChange,
    totalFactUsd,
    totalFactBs,
    setTotalFactUsd,
    setTotalFactBs,
    handleSaveClick,
  } = useMultipleForm(
    initialValuesInput,
    initialValuesPayment,
    openSnackbar,
    formState.facNDE,
    formState.proveedor,
    ErrorOutline,
    CheckCircle
  );
  const purchase = useSelector(
    (state: StoreRootState) => state.purchase.purchase
  );

  const response: ResponseType = purchase ? purchase.response : {};

  const {
    fleets = [],
    providers = [],
    spareParts = [],
    sparePartVariants = [],
  } = response;

  useEffect(() => {
    dispatch(startGetPurchase());
  }, [dispatch]);

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
          value={formState.facNDE || ""}
          onChange={(e) =>
            setFormState((prevState) => ({
              ...prevState,
              facNDE: Number(e.target.value),
            }))
          }
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
                setFormState((prevState) => ({
                  ...prevState,
                  proveedor: value,
                }));
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
      <InvoiceTotals
        totalFactUsd={totalFactUsd}
        totalFactBs={totalFactBs}
        setTotalFactUsd={setTotalFactUsd}
        setTotalFactBs={setTotalFactBs}
        handleSaveClick={handleSaveClick}
      />
      {SnackbarComponent}
    </>
  );
};

export default RegisterPurchase;
