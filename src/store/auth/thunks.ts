import { checkingCredentials, login, logout, showSnackbar } from "./authSlice";
import { AppDispatch } from "../store";
import { authService } from "../../api/authService";
import { AppThunk } from "../store/store";

interface UserCredentials {
  email: string;
  password: string;
  displayName?: string;
}

export const startCreatingUser =
  (userCredentials: UserCredentials): AppThunk =>
  async (dispatch) => {
    dispatch(checkingCredentials());

    const { email, password } = userCredentials;

    const { ok, uid, errorMessage } = await authService.register(
      email,
      password
    );

    if (!ok) {
      dispatch(logout(errorMessage));
      dispatch(showSnackbar(errorMessage));
      return;
    }

    dispatch(login({ uid, email }));
    dispatch(showSnackbar("Usuario registrado con éxito"));
  };
