import InputForm from "../../components/UTInputForm";
import PaymentForm from "../../components/PaymentForm";
import { useState, useEffect } from "react";

export const RegisterPurchase = ({ value, onChange }) => {
  const initialValuesInput = value.inputForm || {
    ut: "",
    marca: "",
    modelo: "",
    eje: "",
    subeje: "",
  };

  const initialValuesPayment = value.paymentForms || [
    {
      repuestos: "",
      descripcionRepuesto: "",
      formaPago: "Contado",
      descripcion: "",
      cantidad: "",
      precioUnitarioBs: "",
      tasaBcv: "",
      precioUnitarioDolares: "",
      montoTotalDolares: "",
      montoTotalBs: "",
      ocOs: "",
      fechaOcOs: "",
      numeroOrdenPago: "",
      observacion: "",
    },
  ];

  const [inputFormValues, setInputFormValues] = useState(initialValuesInput);
  const [paymentFormValues, setPaymentFormValues] =
    useState(initialValuesPayment);

  useEffect(() => {
    onChange({ inputForm: inputFormValues, paymentForms: paymentFormValues });
  }, [inputFormValues, paymentFormValues]);

  const handleInputFormChange = (newValues) => {
    setInputFormValues(newValues);
  };

  const handlePaymentFormChange = (index) => (newValues) => {
    const newPaymentFormValues = [...paymentFormValues];
    newPaymentFormValues[index] = newValues;
    setPaymentFormValues(newPaymentFormValues);
  };

  return (
    <>
      <InputForm
        initialValues={initialValuesInput}
        disabled={false}
        onChange={handleInputFormChange}
      />
      {paymentFormValues.map((initialValues, index) => (
        <PaymentForm
          key={index}
          initialValues={initialValues}
          onChange={handlePaymentFormChange(index)}
        />
      ))}
    </>
  );
};

export default RegisterPurchase;
