import { API_URL } from "./index";

export const userService = {
  getUsers: () => {
    return API_URL.get("users/list")
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
};
