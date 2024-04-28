import React, { useState } from "react";
import { useSelector, useDispatch as _useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { AppDispatch } from "../../store/store";
import { hideSnackbar } from "../../store/auth/authSlice";
import { startCreatingUser } from "../../store/auth/thunks";
import AuthLayout from "../layout/AuthLayout";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";

import {
  StyledButton,
  GridItem,
  GridContainer,
  InputContainer,
  StyledTextField,
} from "./styles";

import {
  Snackbar,
  SnackbarContent,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  MenuItem,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

const formSchema = yup.object().shape({
  name: yup
    .string()
    .required("El nombre es requerido")
    .matches(/^[A-Za-z]+$/, "El nombre sólo debe contener letras"),
  lastName: yup
    .string()
    .required("El apellido es requerido")
    .matches(/^[A-Za-z]+$/, "El apellido sólo debe contener letras"),
  email: yup
    .string()
    .email("Debe ser un correo válido")
    .required("El correo es requerido"),
  password: yup
    .string()
    .min(6, "La clave debe tener al menos 6 caracteres")
    .required("La clave es requerida"),
  role: yup.string().required("El rol es requerido"),
});

export const Register = () => {
  const useDispatch = () => _useDispatch<AppDispatch>();
  const dispatch = useDispatch();
  const { snackbar } = useSelector((state) => state.auth);

  const formData = {
    email: "",
    password: "",
    name: "",
    lastName: "",
    role: "",
  };

  const {
    formState: { email, password, name, lastName, role },
    onInputChange,
  } = useForm(formData);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const onSubmit = async (event: any) => {
    event.preventDefault();
    try {
      await formSchema.validate(
        { email, password, name, lastName, role },
        { abortEarly: false }
      );
      const response = await dispatch(
        startCreatingUser({ email, password, name, lastName, role })
      );
      console.log(response);
      if (response.wasSuccessful) {
        setErrors({});
        setTimeout(() => {
          navigate("/auth/login");
        }, 4000);
      }
    } catch (error) {
      console.log(error);
      setErrors(
        error.inner.reduce(
          (acc, curr) => ({ ...acc, [curr.path]: curr.message }),
          {}
        )
      );
    }
  };

  return (
    <>
      <AuthLayout title={"Registrar usuario"}>
        <form onSubmit={onSubmit}>
          <GridContainer container>
            <InputContainer item xs={12}>
              <StyledTextField
                label="Nombre"
                type="text"
                placeholder="Nombre"
                fullWidth
                name="name"
                value={name}
                onChange={onInputChange}
                helperText={errors.name}
                error={!!errors.name}
              />
              <StyledTextField
                label="Apellido"
                type="text"
                placeholder="Apellido"
                fullWidth
                name="lastName"
                value={lastName}
                onChange={onInputChange}
                helperText={errors.lastName}
                error={!!errors.lastName}
              />
              <StyledTextField
                label="Correo"
                type="email"
                placeholder="correo@correo.com"
                fullWidth
                name="email"
                value={email}
                onChange={onInputChange}
                helperText={errors.email}
                error={!!errors.email}
              />
              <StyledTextField
                label="Clave"
                type="password"
                placeholder="Clave"
                fullWidth
                name="password"
                value={password}
                onChange={onInputChange}
                helperText={errors.password}
                error={!!errors.password}
              />
              <FormControl fullWidth>
                <InputLabel id="role-label">Rol</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  value={role}
                  label="Rol"
                  onChange={onInputChange}
                  name="role"
                  error={!!errors.role}
                >
                  <MenuItem value={"admin"}>Administrador</MenuItem>
                  <MenuItem value={"store"}>Almacén</MenuItem>
                </Select>
                {!!errors.role && (
                  <FormHelperText error>{errors.role}</FormHelperText>
                )}
              </FormControl>
            </InputContainer>
          </GridContainer>
          <GridContainer container>
            <GridItem item xs={12} sm={6}>
              <StyledButton type="submit" variant="contained" fullWidth>
                Registrar
              </StyledButton>
            </GridItem>
            <GridItem
              item
              xs={12}
              sm={6}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Link
                to="/auth/login"
                style={{ color: "black", fontSize: "1.5em" }}
              >
                ¿Ya tienes cuenta?
              </Link>
            </GridItem>
          </GridContainer>
        </form>
      </AuthLayout>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => dispatch(hideSnackbar())}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <SnackbarContent
          message={
            <span style={{ display: "flex", alignItems: "center" }}>
              {snackbar.type === "success" ? (
                <CheckCircleIcon style={{ marginRight: "8px" }} />
              ) : (
                <ErrorIcon style={{ marginRight: "8px" }} />
              )}
              {snackbar.message}
            </span>
          }
          style={{
            color: "white",
            backgroundColor: snackbar.type === "success" ? "green" : "red",
            fontSize: "20px",
          }}
        />
      </Snackbar>
    </>
  );
};

export default Register;
