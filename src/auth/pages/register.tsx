import { Alert } from "@mui/material";
import { Snackbar } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import {
  StyledButton,
  ForgotText,
  GridItem,
  GridContainer,
  InputContainer,
  StyledTextField,
} from "./styles";

export const Register = () => {
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    severity: "",
  });

  const handleRegister = (event) => {
    event.preventDefault();
    // Aquí va tu lógica de registro
    // Si el registro es exitoso
    setAlert({
      show: true,
      message: "Registrado con éxito",
      severity: "success",
    });
    setTimeout(() => setAlert({ ...alert, show: false }), 4000);
    // Si el registro falla
    // setAlert({ show: true, message: 'Error al registrar', severity: 'error' });
  };

  return (
    <>
      <AuthLayout title={"Registrar usuario"}>
        <form className="" onSubmit={handleRegister}>
          <GridContainer container>
            <InputContainer item xs={12}>
              <StyledTextField
                label="Correo"
                type="email"
                placeholder="correo@correo.com"
                fullWidth
              />
              <StyledTextField
                label="Clave"
                type="password"
                placeholder="Clave"
                fullWidth
                name="password"
              />
              <StyledTextField
                label="Repetir Clave"
                type="password"
                placeholder="Clave"
                fullWidth
                name="password"
              />
            </InputContainer>
            <Snackbar
              open={alert.show}
              autoHideDuration={4000}
              onClose={() => setAlert({ ...alert, show: false })}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Alert variant="filled" severity={alert.severity}>
                {alert.message}
              </Alert>
            </Snackbar>
            <GridContainer container spacing={2}>
              <GridItem item xs={12} sm={6}>
                <StyledButton type="submit" variant="contained" fullWidth>
                  Registrar
                </StyledButton>
              </GridItem>
              <GridItem item xs={12} sm={6}>
                <Link to="/auth/login">
                  <StyledButton type="button" variant="contained" fullWidth>
                    Volver
                  </StyledButton>
                </Link>
              </GridItem>
            </GridContainer>
          </GridContainer>
        </form>
      </AuthLayout>
    </>
  );
};

export default Register;
