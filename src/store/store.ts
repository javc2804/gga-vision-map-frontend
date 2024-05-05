// store.ts
import { configureStore, Store } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import purchaseReducer from "./purchase/purchaseSlice"; // Import the purchase reducer
import noteInvoicesReducer from "./notes/noteInvoicesSlice"; // Import the noteInvoices reducer

export const store: Store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    purchase: purchaseReducer, // Add the purchase reducer
    noteInvoices: noteInvoicesReducer, // Add the noteInvoices reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
