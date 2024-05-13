import InputForm from "../../components/UTInputForm";
import PaymentForm from "../../components/PaymentForm";
import { useState } from "react";

export const RegisterPurchase = () => {
  const initialValuesInput = {
    ut: "",
    marca: "",
    modelo: "",
    eje: "",
    subeje: "",
  };

  const initialValuesPayment = {
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
  };

  const isDisabledInput = Object.values(initialValuesInput).some(
    (value) => value !== ""
  );
  const isDisabledPayment = Object.values(initialValuesPayment).some(
    (value) => value !== ""
  );

  const [purchaseForms, setPurchaseForms] = useState([{}]);

  return (
    <>
      <InputForm
        initialValues={initialValuesInput}
        disabled={false}
        onChange={(newValues) => {
          // Aquí puedes manejar los nuevos valores del formulario
        }}
      />
      {purchaseForms.map((initialValues, index) => (
        <PaymentForm
          key={index}
          initialValues={initialValues}
          onChange={(newFormValues) => {
            const newPurchaseForms = [...purchaseForms];
            newPurchaseForms[index] = newFormValues;
            setPurchaseForms(newPurchaseForms);
          }}
        />
      ))}
    </>
  );
};

export default RegisterPurchase;
