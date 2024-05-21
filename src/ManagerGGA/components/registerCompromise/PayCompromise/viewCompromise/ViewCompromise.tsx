import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  RootState as StoreRootState,
  useAppDispatch,
} from "../../../../../store/store";
import { useForm } from "react-hook-form";
import { Button, Box } from "@mui/material";

import { startGetPurchase } from "../../../../../store/purchase/purchaseThunks";
import { useSnackbar } from "../../../../../hooks/useSnackBar";
import { ErrorOutline, CheckCircle } from "@mui/icons-material";

import CompromiseProvidersView from "./viewComponentsCompromise/invoices/CompromiseProvidersView";
import PaymentFormCompromiseView from "./viewComponentsCompromise/PaymentFormCompromiseView";
import useMultipleFormCompromiseView from "../../../../hooks/compromises/useMultipleFormCompromise";

interface RegisterPurchaseProps {
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
}

interface Provider {
  id: string;
  name: string;
}

interface ResponseType {
  providers?: Provider[];
  spareParts?: any[];
  sparePartVariants?: any[];
}

const initialValuesPayment = {
  repuesto: null,
  descripcionRepuesto: null,
  formaPago: "Credito",
  descripcion: "",
  cantidad: "",
  precioUnitarioUsd: "",
  montoTotalUsd: "",
  ocOs: "",
  fechaOcOs: null,
  numeroOrdenPago: "",
  observacion: "",
  nde: 0,
  proveedor: null,
  compromiso: "",
};

const boxStyles = {
  p: 4,
  mb: 4,
  mr: 4,
  mt: 2,
  ml: 2,
  borderRadius: 4,
  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.45)",
};

export const VIewCompromise: React.FC<RegisterPurchaseProps> = () => {
  const dispatch = useAppDispatch();

  const { control } = useForm();

  const [formState, setFormState] = useState<{
    nde: number;
    compromiso: string;
    proveedor: Provider | null;
  }>({ nde: 0, compromiso: "", proveedor: null });

  const { SnackbarComponent, openSnackbar } = useSnackbar();
  const { forms, handleAddClick, handleRemoveClick, handlePaymentChange } =
    useMultipleFormCompromiseView(
      initialValuesPayment,
      openSnackbar,
      formState.nde,
      formState.proveedor,
      formState.compromiso,
      ErrorOutline,
      CheckCircle
    );
  const purchase = useSelector(
    (state: StoreRootState) => state.purchase.purchase
  );

  // const response: ResponseType = purchase ? purchase.response : {};
  let response: ResponseType = {};

  if (purchase && purchase.response) {
    response = purchase.response;
  }
  const { providers = [], spareParts = [], sparePartVariants = [] } = response;

  useEffect(() => {
    dispatch(startGetPurchase());
  }, [dispatch]);

  return (
    <>
      {forms.map((form, index) => (
        <Box key={index} sx={boxStyles}>
          <CompromiseProvidersView
            control={control}
            providers={providers}
            setFormState={setFormState}
          />
          <PaymentFormCompromiseView
            initialValues={form.payment}
            onChange={handlePaymentChange(form.id)}
            spareParts={spareParts}
            sparePartVariants={sparePartVariants}
          />
        </Box>
      ))}

      {SnackbarComponent}
    </>
  );
};

export default VIewCompromise;
