import { configureStore, Store, Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { authSlice } from "./auth/authSlice";
import purchaseReducer from "./purchase/purchaseSlice";
import noteInvoicesReducer from "./notes/noteInvoicesSlice";
import { useDispatch as useReduxDispatch } from "react-redux";
import { compromisesSlice } from "./compromises/compromisesSlices";

export const store: Store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    purchase: purchaseReducer,
    noteInvoices: noteInvoicesReducer,
    compromises: compromisesSlice.reducer,
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
