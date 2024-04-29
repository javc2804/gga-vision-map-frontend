import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SnackbarState {
  open: boolean;
  message: string;
  type: "success" | "error";
}

interface AuthState {
  status: string;
  uid: string | null;
  email: string | null;
  displayName: string | null;
  name: string | null;
  lastName: string | null;
  role: string | null;
  errorMessage: string | null;
  snackbar: SnackbarState;
  token: string | null; // Agregamos el token al estado
}

const initialState: AuthState = {
  status: "checking",
  uid: null,
  email: null,
  displayName: null,
  name: null,
  lastName: null,
  role: null,
  errorMessage: null,
  snackbar: {
    open: false,
    message: "",
    type: "success",
  },
  token: null, // Inicializamos el token como null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.status = "authenticated";
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.name = payload.name;
      state.lastName = payload.lastName;
      state.role = payload.role;
      state.errorMessage = null;
    },
    logout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.errorMessage = payload;
      state.token = null; // Limpiamos el token cuando el usuario cierra sesión
    },
    checkingCredentials: (state) => {
      state.status = "checking";
    },
    showSnackbar: (
      state,
      action: PayloadAction<{ message: string; type: "success" | "error" }>
    ) => {
      state.snackbar.open = true;
      state.snackbar.message = action.payload.message;
      state.snackbar.type = action.payload.type;
    },
    hideSnackbar: (state) => {
      state.snackbar.open = false;
      state.snackbar.message = "";
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const {
  login,
  logout,
  checkingCredentials,
  showSnackbar,
  hideSnackbar,
  setToken, // Exportamos la acción setToken
} = authSlice.actions;

export default authSlice.reducer;
