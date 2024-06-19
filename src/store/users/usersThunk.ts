import { userService } from "../../api/userService";
import { AppDispatch } from "../store";
import { userList } from "./usersSlice";

export const startGetUsers = (): any => async (dispatch: AppDispatch) => {
  try {
    const users = await userService.getUsers();
    dispatch(userList(users.response));
  } catch (error: any) {
    if (error instanceof Error) {
      // dispatch(getPurchaseFailure(error.message));
    } else {
      // dispatch(getPurchaseFailure("An unknown error occurred."));
    }
  }
};
