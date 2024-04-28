import React from "react";
import AuthLayout from "../layout/AuthLayout";
import { useSelector, useDispatch as _useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { hideSnackbar } from "../../store/auth/authSlice";
import { startCreatingUser } from "../../store/auth/thunks";
import { useForm } from "../../hooks/useForm";
import { AppDispatch } from "../../store/store";
import {
  StyledButton,
  GridItem,
  GridContainer,
  InputContainer,
  StyledTextField,
} from "./styles";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const useDispatch = () => _useDispatch<AppDispatch>();
  const dispatch = useDispatch();
  const { snackbar } = useSelector((state) => state.auth);

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
  const navigate = useNavigate();

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const wasSuccessful = await dispatch(
      startCreatingUser({ email, password })
    );
    console.log(wasSuccessful);
    if (wasSuccessful) {
      setTimeout(() => {
        navigate("/auth/login");
      }, 4000);
    }
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
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => dispatch(hideSnackbar())}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <SnackbarContent
          message={
            <span style={{ display: "flex", alignItems: "center" }}>
              <CheckCircleIcon style={{ marginRight: "8px" }} />{" "}
              {snackbar.message}
            </span>
          }
          style={{ color: "white", backgroundColor: "green", fontSize: "20px" }}
        />
      </Snackbar>
    </>
  );
};

export default Register;
