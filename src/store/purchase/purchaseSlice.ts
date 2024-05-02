// purchaseSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface PurchaseState {
  loading: boolean;
  error: string | null;
  purchase: any | null;
}

const initialState: PurchaseState = {
  loading: false,
  error: null,
  purchase: null,
};

export const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    getPurchaseStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getPurchaseSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.purchase = action.payload;
    },
    getPurchaseFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getPurchaseStart, getPurchaseSuccess, getPurchaseFailure } =
  purchaseSlice.actions;

export const selectPurchase = (state: RootState) => state.purchase.purchase;
export const selectLoading = (state: RootState) => state.purchase.loading;
export const selectError = (state: RootState) => state.purchase.error;

export default purchaseSlice.reducer;
