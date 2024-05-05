// purchaseThunks.ts
import { AppDispatch } from "../store";
import {
  getPurchaseStart,
  getPurchaseSuccess,
  getPurchaseFailure,
} from "./purchaseSlice";
import { purchaseService } from "../../api/purchaseService";
import { AppThunk } from "../../store/purchase/purchaseSlice";

export const startGetPurchase =
  (): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(getPurchaseStart());
    try {
      const purchaseData = await purchaseService.getPurchase();
      dispatch(getPurchaseSuccess(purchaseData));
    } catch (error) {
      dispatch(getPurchaseFailure(error.message));
    }
  };

export const startSavePurchase =
  (purchaseData: any): AppThunk =>
  async (dispatch: AppDispatch) => {
    dispatch(getPurchaseStart());
    try {
      const result = await purchaseService.savePurchase(purchaseData);
      if (result.ok) {
        dispatch(getPurchaseSuccess(result.response));
      } else {
        throw new Error(result.response);
      }
    } catch (error) {
      dispatch(getPurchaseFailure(error.message));
    }
  };
