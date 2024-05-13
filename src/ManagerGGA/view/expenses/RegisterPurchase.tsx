import InputForm from "../../components/UTInputForm";

export const RegisterPurchase = () => {
  const initialValues = {
    ut: "",
    marca: "",
    modelo: "",
    eje: "",
    subeje: "",
  };

  const isDisabled = Object.values(initialValues).some((value) => value !== "");

  return <InputForm initialValues={initialValues} disabled={isDisabled} />;
};

export default RegisterPurchase;
