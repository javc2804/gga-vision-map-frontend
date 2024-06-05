import { AppDispatch } from "../store";
import {
  getPurchaseStart,
  getPurchaseSuccess,
  getPurchaseFailure,
  getListPurchase,
  getFilters,
} from "./purchaseSlice";
import { purchaseService } from "../../api/purchaseService";
import {
  ClearCompromise,
  getCompromise,
  getCompromiseLoading,
} from "../compromises/compromisesSlices";
//TODO: cambiar nombre de la funcion
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
export const startGetPurchaseTrans =
  (id: any): any =>
  async (dispatch: AppDispatch) => {
    dispatch(getCompromiseLoading());
    try {
      const purchaseData = await purchaseService.getPurchase(id);
      dispatch(ClearCompromise());
      dispatch(getCompromise(purchaseData));
    } catch (error: any) {
      if (error instanceof Error) {
        dispatch(getPurchaseFailure(error.message));
      } else {
        dispatch(getPurchaseFailure("An unknown error occurred."));
      }
    }
  };
export const startGetCompromise =
  (id: any): any =>
  async (dispatch: AppDispatch) => {
    dispatch(getPurchaseStart());
    try {
      const purchaseData = await purchaseService.getCompromise(id);
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
export const startSavePurchaseAsing =
  (purchaseData: any): any =>
  async (dispatch: AppDispatch) => {
    dispatch(getPurchaseStart());
    try {
      const result = await purchaseService.savePurchaseAsing(purchaseData);
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
export const startSaveTransCompromise =
  (purchaseData: any): any =>
  async (dispatch: AppDispatch) => {
    dispatch(getPurchaseStart());
    try {
      const result = await purchaseService.savePurchaseUpdateComprimise(
        purchaseData
      );
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
export const startGetListPurchase =
  (purchaseData: any): any =>
  async (dispatch: AppDispatch) => {
    const { filters, page, limit, startDate, endDate } = purchaseData;

    // Agrega los filtros y las fechas de inicio y fin a compromiseData
    const compromiseData = {
      ...filters,
      startDate,
      endDate,
    };

    dispatch(getPurchaseStart());

    try {
      const offset = page * limit;
      const result = await purchaseService.getListPurchase(
        compromiseData,
        page,
        limit,
        offset
      );
      if (result.ok) {
        dispatch(getListPurchase(result.response));
      } else {
        dispatch(getPurchaseFailure(result.response));
      }
      return result;
    } catch (error: any) {
      if (error instanceof Error) {
        dispatch(getPurchaseFailure(error.message));
      } else {
        dispatch(getPurchaseFailure("An unknown error occurred."));
      }
      return { ok: false, response: error.message };
    }
  };

export const startHandleSearch =
  (
    filters: any,
    startDate: string,
    endDate: string,
    page: number = 0,
    limit: number = 5
  ): any =>
  async (dispatch: AppDispatch) => {
    console.log(filters);

    const purchaseData = {
      filters,
      page,
      limit,
      startDate,
      endDate,
    };

    dispatch(startGetListPurchase(purchaseData));
    dispatch(getFilters(filters));
  };
