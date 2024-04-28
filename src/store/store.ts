import { configureStore, Store } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";

export const store: Store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
