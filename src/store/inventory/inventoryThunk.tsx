import { AppDispatch } from "../store";

export const startGetInventory = (): any => async (dispatch: AppDispatch) => {
  try {
    //   const result = await almacenService.getTransactions();
    //   dispatch(getTransactions(result));
  } catch (error: any) {
    if (error instanceof Error) {
      // dispatch(getPurchaseFailure(error.message));
    } else {
      // dispatch(getPurchaseFailure("An unknown error occurred."));
    }
  }
};
