import { AppDispatch } from "../store";
import {
  getPurchaseStart,
  getPurchaseSuccess,
  getPurchaseFailure,
} from "./purchaseSlice";
import { purchaseService } from "../../api/purchaseService";
// import { AppThunk } from "../../store/store";

export const startGetPurchase = (): any => async (dispatch: AppDispatch) => {
  dispatch(getPurchaseStart());
  try {
    const purchaseData = await purchaseService.getCombinedData();
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
        dispatch(getPurchaseFailure(result.response));
      }
      return result; // Asegúrate de que estás devolviendo el resultado aquí
    } catch (error: any) {
      if (error instanceof Error) {
        dispatch(getPurchaseFailure(error.message));
      } else {
        dispatch(getPurchaseFailure("An unknown error occurred."));
      }
      return { ok: false, response: error.message }; // Y aquí
    }
  };
export const startSaveCompromise =
  (purchaseData: any): any =>
  async (dispatch: AppDispatch) => {
    dispatch(getPurchaseStart());
    try {
      const result = await purchaseService.saveCompromise(purchaseData);
      if (result.ok) {
        dispatch(getPurchaseSuccess(result.response));
      } else {
        dispatch(getPurchaseFailure(result.response));
      }
      return result; // Asegúrate de que estás devolviendo el resultado aquí
    } catch (error: any) {
      if (error instanceof Error) {
        dispatch(getPurchaseFailure(error.message));
      } else {
        dispatch(getPurchaseFailure("An unknown error occurred."));
      }
      return { ok: false, response: error.message }; // Y aquí
    }
  };
