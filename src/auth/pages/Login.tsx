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

export const Login = () => {
  return (
    <>
      <AuthLayout title={"Iniciar Sesión"}>
        <form className="">
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
            </InputContainer>
            <GridItem item xs={12}>
              <GridContainer container justifyContent="flex-end">
                <ForgotText href="#">¿Olvidaste la clave?</ForgotText>
              </GridContainer>
            </GridItem>
            <GridContainer container spacing={2}>
              <GridItem item xs={12} sm={6}>
                <StyledButton type="submit" variant="contained" fullWidth>
                  Iniciar
                </StyledButton>
              </GridItem>
              <GridItem item xs={12} sm={6}>
                <Link to="/auth/register">
                  <StyledButton type="submit" variant="contained" fullWidth>
                    Registrar
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

export default Login;
