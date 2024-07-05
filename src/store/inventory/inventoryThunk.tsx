import { inventoryService } from "../../api/inventoryService";
import { AppDispatch } from "../store";
import { getInventory } from "./inventorySlice";

export const startGetInventory = (): any => async (dispatch: AppDispatch) => {
  try {
    const result = await inventoryService.getInventory();
    dispatch(getInventory(result));
  } catch (error: any) {
    if (error instanceof Error) {
      // dispatch(getPurchaseFailure(error.message));
    } else {
      // dispatch(getPurchaseFailure("An unknown error occurred."));
    }
  }
};
