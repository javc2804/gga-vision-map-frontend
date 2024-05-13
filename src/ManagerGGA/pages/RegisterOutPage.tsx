import ManagerGGALayout from "../layout/ManagerGGALayout";
import { RegisterPurchase, RegisterCompromise } from "../view/expenses/index";

export const RegisterOutPage = () => {
  return (
    <ManagerGGALayout>
      <RegisterPurchase />
      <RegisterCompromise />
    </ManagerGGALayout>
  );
};

export default RegisterOutPage;
