import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { startSavePurchase } from "../../../store/purchase/purchaseThunks";

const useMultipleForm = (
  initialValuesInput: any,
  initialValuesPayment: any,
  openSnackbar: any,
  facNDE: any,
  proveedor: any,
  ErrorOutline: any,
  CheckCircle: any
) => {
  const dispatch = useDispatch();

  const [forms, setForms] = useState([
    {
      id: 0,
      input: initialValuesInput,
      payment: initialValuesPayment,
      errors: {},
    },
  ]);
  const [nextId, setNextId] = useState(1);
  const [totalFactUsd, setTotalFactUsd] = useState(0); // Agregado
  const [totalFactBs, setTotalFactBs] = useState(0); // Agregado

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

  const handleRemoveClick = (id: any) => {
    const list = forms.filter((form) => form.id !== id);
    setForms(list);
  };

  // const handleInputChange = useCallback(
  //   (id: any) => (newValues: any, newErrors: any) => {
  //     setForms((prevForms) =>
  //       prevForms.map((form) =>
  //         form.id === id
  //           ? { ...form, input: newValues, errors: newErrors }
  //           : form
  //       )
  //     );
  //   },
  //   [setForms]
  // );

  const handlePaymentChange = useCallback(
    (id: any) => (newValues: any, newErrors: any) => {
      setForms((prevForms) => {
        let totalUsd = 0;
        let totalBs = 0;

        const newForms = prevForms.map((form) => {
          if (form.id === id) {
            totalUsd += isNaN(parseFloat(newValues.montoTotalUsd))
              ? 0
              : parseFloat(newValues.montoTotalUsd);
            totalBs += isNaN(parseFloat(newValues.montoTotalBs))
              ? 0
              : parseFloat(newValues.montoTotalBs);
            return { ...form, payment: newValues, errors: newErrors };
          } else {
            totalUsd += isNaN(parseFloat(form.payment.montoTotalUsd))
              ? 0
              : parseFloat(form.payment.montoTotalUsd);
            totalBs += isNaN(parseFloat(form.payment.montoTotalBs))
              ? 0
              : parseFloat(form.payment.montoTotalBs);
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

  const handleSaveClick = async () => {
    const userEmail = localStorage.getItem("email");
    const combinedForms = forms.map((form) => {
      form.payment.facNDE = facNDE;
      form.payment.proveedor = proveedor;
      return {
        id: form.id,
        ...form.input,
        ...form.payment,
        user_rel: userEmail,
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
    // const hasErrorsUt = forms.some((form) => {
    //   const requiredFields = ["ut"];

    //   return requiredFields.some((field) => {
    //     const hasError = !form.input[field] || form.input[field] === null;
    //     if (hasError) {
    //       errorField = field;
    //     }
    //     return hasError;
    //   });
    // });

    // if (hasErrorsUt) {
    //   openSnackbar(
    //     `Error al guardar, verifica el campo ${errorField}`,
    //     "error",
    //     ErrorOutline
    //   );
    //   return;
    // }

    if (facNDE === "0" || "") {
      openSnackbar(
        `Error al guardar, Fac/NDE debe estar lleno y distinto a 0`,
        "error",
        ErrorOutline
      );
      return;
    }
    const result = await dispatch(startSavePurchase(combinedForms));
    if (result.ok) {
      openSnackbar("Guardado exitosamente", "success", CheckCircle);
    } else {
      openSnackbar(
        `Error al guardar: ${result.response}`,
        "error",
        ErrorOutline
      );
    }
  };

  return {
    forms,
    handleAddClick,
    handleRemoveClick,
    // handleInputChange,
    handlePaymentChange,
    totalFactUsd,
    totalFactBs,
    setTotalFactUsd,
    setTotalFactBs,
    handleSaveClick,
  };
};

export default useMultipleForm;
