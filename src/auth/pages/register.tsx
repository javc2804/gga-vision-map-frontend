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
  return (
    <>
      <AuthLayout title={"Registrar usuario"}>
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
              <StyledTextField
                label="Repetir Clave"
                type="password"
                placeholder="Clave"
                fullWidth
                name="password"
              />
            </InputContainer>
            <GridContainer container spacing={2}>
              <GridItem item xs={12} sm={6}>
                <StyledButton type="submit" variant="contained" fullWidth>
                  Registrar
                </StyledButton>
              </GridItem>
              <GridItem item xs={12} sm={6}>
                <StyledButton type="submit" variant="contained" fullWidth>
                  Volver
                </StyledButton>
              </GridItem>
            </GridContainer>
          </GridContainer>
        </form>
      </AuthLayout>
    </>
  );
};

export default Register;
