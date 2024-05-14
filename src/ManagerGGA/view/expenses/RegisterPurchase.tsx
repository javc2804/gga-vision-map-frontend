import React, { useState } from "react";
import InputForm from "../../components/UTInputForm";
import PaymentForm from "../../components/PaymentForm";
import Button from "@mui/material/Button";

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
    precioUnitarioBs: 0.0,
    tasaBcv: "",
    precioUnitarioDolares: "",
    montoTotalDolares: "",
    montoTotalBs: "",
    ocOs: "",
    fechaOcOs: "",
    numeroOrdenPago: "",
    observacion: "",
  };

  const [nextId, setNextId] = useState(1);
  const [forms, setForms] = useState([
    {
      id: 0,
      input: initialValuesInput,
      payment: initialValuesPayment,
      errors: {},
    },
  ]);

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
    const hasErrors = forms.some((form) => {
      return form.errors && Object.keys(form.errors).length > 0;
    });
    console.log(hasErrors);
    if (hasErrors) {
      console.log("Error");
      return;
    }
    console.log(forms);
  };

  const handleInputChange = (id) => (newValues, newErrors) => {
    const newForms = forms.map((form) =>
      form.id === id ? { ...form, input: newValues, errors: newErrors } : form
    );
    setForms(newForms);
  };

  const handlePaymentChange = (id) => (newValues, newErrors) => {
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === id
          ? { ...form, payment: newValues, errors: newErrors }
          : form
      )
    );
  };

  return (
    <>
      {forms.map((form) => (
        <div key={form.id}>
          <InputForm
            initialValues={form.input}
            disabled={false}
            onChange={handleInputChange(form.id)}
          />
          <PaymentForm
            initialValues={form.payment}
            onChange={handlePaymentChange(form.id)}
          />
          {forms.length > 1 && (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleRemoveClick(form.id)}
            >
              Borrar
            </Button>
          )}
        </div>
      ))}
      <Button variant="contained" color="primary" onClick={handleAddClick}>
        Agregar
      </Button>
      <Button variant="contained" color="success" onClick={handleSaveClick}>
        Guardar
      </Button>
    </>
  );
};

export default RegisterPurchase;
