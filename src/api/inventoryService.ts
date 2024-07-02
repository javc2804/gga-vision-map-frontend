import { API_URL } from "./index";

export const inventoryService = {
  getUsers: () => {
    return API_URL.get("inventory/list")
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
};
