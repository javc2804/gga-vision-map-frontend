import { AnyIfEmpty } from "react-redux";
import { providersService } from "../../api/providersService";
import { AppDispatch } from "../store";
import { getList } from "./providersSlice";

export const startGetProviders = (): any => async (dispatch: AppDispatch) => {
  try {
    const providers = await providersService.getProviders();
    dispatch(getList(providers.response));
  } catch (error: any) {
    if (error instanceof Error) {
      // dispatch(getPurchaseFailure(error.message));
    } else {
      // dispatch(getPurchaseFailure("An unknown error occurred."));
    }
  }
};
export const startCreatingProveedor =
  (data: any): any =>
  async (dispatch: AppDispatch) => {
    try {
      const { ok } = await providersService.createProviders(data);
      if (ok) {
        return { wasSuccessful: true, errors: {} };
      } else {
        return { wasSuccessful: false };
      }
      // dispatch(getList(providers.response));
    } catch (error: any) {
      if (error instanceof Error) {
        // dispatch(getPurchaseFailure(error.message));
      } else {
        // dispatch(getPurchaseFailure("An unknown error occurred."));
      }
    }
  };
export const startExportProviders = (): any => async () => {
  try {
    providersService.exportProviders();
  } catch (error: any) {
    if (error instanceof Error) {
      // dispatch(getPurchaseFailure(error.message));
    } else {
      // dispatch(getPurchaseFailure("An unknown error occurred."));
    }
  }
};
