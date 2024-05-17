import { configureStore, Store, Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { authSlice } from "./auth/authSlice";
import purchaseReducer from "./purchase/purchaseSlice"; // Import the purchase reducer
import noteInvoicesReducer from "./notes/noteInvoicesSlice"; // Import the noteInvoices reducer
import { useDispatch as useReduxDispatch } from "react-redux";

export const store: Store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    purchase: purchaseReducer, // Add the purchase reducer
    noteInvoices: noteInvoicesReducer, // Add the noteInvoices reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useReduxDispatch<AppDispatch>();
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
