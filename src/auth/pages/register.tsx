// import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import AuthLayout from "../layout/AuthLayout";

import {
  StyledButton,
  GridItem,
  GridContainer,
  InputContainer,
  StyledTextField,
} from "./styles";

import { startCreatingUser } from "../../store/auth/thunks";
import { useForm } from "../../hooks/useForm";
import { useDispatch as _useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";

export const Register = () => {
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    severity: "",
  });

  const useDispatch = () => _useDispatch<AppDispatch>();
  const dispatch = useDispatch();

  // const { status, errorMessage } = useSelector((state) => state.auth);
  // const isCheckingAuthentication = useMemo(
  //   () => status === "checking",
  //   [status]
  // );

  // Define formData y formValidations aquí
  const formData = {
    email: "", // valor inicial para email
    password: "", // valor inicial para password
  };
  const formValidations = {
    /* tus validaciones de formulario aquí */
  };

  const {
    formState: { email, password },
    onInputChange,
    isFormValid,
  } = useForm(formData, formValidations);

  const onSubmit = (event: any) => {
    event.preventDefault();
    console.log("llegue");
    dispatch(startCreatingUser({ email, password }));
    setAlert({
      show: true,
      message: "Registrado con éxito",
      severity: "success",
    });
  };

  return (
    <>
      <AuthLayout title={"Registrar usuario"}>
        <form className="" onSubmit={onSubmit}>
          <GridContainer container>
            <InputContainer item xs={12}>
              <StyledTextField
                label="Correo"
                type="email"
                placeholder="correo@correo.com"
                fullWidth
                name="email"
                value={email}
                onChange={onInputChange}
              />
              <StyledTextField
                label="Clave"
                type="password"
                placeholder="Clave"
                fullWidth
                name="password"
                value={password}
                onChange={onInputChange}
              />
            </InputContainer>
          </GridContainer>
          <GridItem item xs={12} sm={6}>
            <StyledButton type="submit" variant="contained" fullWidth>
              Registrar
            </StyledButton>
          </GridItem>
        </form>
      </AuthLayout>
    </>
  );
};

export default Register;
