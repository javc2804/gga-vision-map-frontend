import { API_URL } from "./index";

export const inventoryService = {
  getInventory: () => {
    return API_URL.get("inventory/list")
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
  getInventoryByDescription: (description: any) => {
    return API_URL.post("inventory/description", { description })
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
};
