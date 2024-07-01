import { configureStore, Store, Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { authSlice } from "./auth/authSlice";
import purchaseReducer from "./purchase/purchaseSlice";
import noteInvoicesReducer from "./notes/noteInvoicesSlice";
import { useDispatch as useReduxDispatch } from "react-redux";
import { compromisesSlice } from "./compromises/compromisesSlices";
import { UsersSlice } from "./users/usersSlice";
import { outInternalSlice } from "./out-internal/outInternalSlice";
import { providersSlice } from "./providersOut/providersSlice";
import { sparePartsSlice } from "./spareParts/sparePartsSlice";
import { almacenSlice } from "./almacen/almacenSlice";

export const store: Store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    purchase: purchaseReducer,
    noteInvoices: noteInvoicesReducer,
    compromises: compromisesSlice.reducer,
    users: UsersSlice.reducer,
    outInternal: outInternalSlice.reducer,
    providers: providersSlice.reducer,
    spareParts: sparePartsSlice.reducer,
    almacen: almacenSlice.reducer,
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
