// purchaseSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface PurchaseState {
  loading: boolean;
  error: string | null;
  purchase: any | null;
  saveStatus: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: PurchaseState = {
  loading: false,
  error: null,
  purchase: null,
  saveStatus: "idle",
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
    savePurchaseStart: (state) => {
      state.saveStatus = "loading";
    },
    savePurchaseSuccess: (state) => {
      state.saveStatus = "succeeded";
    },
    savePurchaseFailure: (state, action: PayloadAction<string>) => {
      state.saveStatus = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  getPurchaseStart,
  getPurchaseSuccess,
  getPurchaseFailure,
  savePurchaseStart,
  savePurchaseSuccess,
  savePurchaseFailure,
} = purchaseSlice.actions;

export const selectPurchase = (state: RootState) => state.purchase.purchase;
export const selectLoading = (state: RootState) => state.purchase.loading;
export const selectError = (state: RootState) => state.purchase.error;
export const selectSaveStatus = (state: RootState) => state.purchase.saveStatus;

export default purchaseSlice.reducer;
