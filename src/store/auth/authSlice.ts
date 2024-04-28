import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  status: string;
  uid: string | null;
  email: string | null;
  displayName: string | null;
  errorMessage: string | null;
  snackbar: {
    open: boolean;
    message: string;
  };
}

const initialState: AuthState = {
  status: "checking",
  uid: null,
  email: null,
  displayName: null,
  errorMessage: null,
  snackbar: {
    open: false,
    message: "",
  },
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
      state.errorMessage = null;
    },
    logout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.errorMessage = payload;
    },
    checkingCredentials: (state) => {
      state.status = "checking";
    },
    showSnackbar: (state, action: PayloadAction<string>) => {
      state.snackbar.open = true;
      state.snackbar.message = action.payload;
    },
    hideSnackbar: (state) => {
      state.snackbar.open = false;
      state.snackbar.message = "";
    },
  },
});

export const {
  login,
  logout,
  checkingCredentials,
  showSnackbar,
  hideSnackbar,
} = authSlice.actions;

export default authSlice.reducer;
