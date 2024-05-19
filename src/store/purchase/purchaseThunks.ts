import { AppDispatch } from "../store";
import {
  getPurchaseStart,
  getPurchaseSuccess,
  getPurchaseFailure,
} from "./purchaseSlice";
import { purchaseService } from "../../api/purchaseService";
import { AppThunk } from "../../store/store";

export const startGetPurchase = (): any => async (dispatch: AppDispatch) => {
  dispatch(getPurchaseStart());
  try {
    const purchaseData = await purchaseService.getPurchase();
    dispatch(getPurchaseSuccess(purchaseData));
  } catch (error: any) {
    if (error instanceof Error) {
      dispatch(getPurchaseFailure(error.message));
    } else {
      dispatch(getPurchaseFailure("An unknown error occurred."));
    }
  }
};

export const startSavePurchase =
  (purchaseData: any): any =>
  async (dispatch: AppDispatch) => {
    dispatch(getPurchaseStart());
    try {
      const result = await purchaseService.savePurchase(purchaseData);
      if (result.ok) {
        dispatch(getPurchaseSuccess(result.response));
      } else {
        throw new Error(result.response);
      }
    } catch (error: any) {
      if (error instanceof Error) {
        dispatch(getPurchaseFailure(error.message));
      } else {
        dispatch(getPurchaseFailure("An unknown error occurred."));
      }
    }
  };
