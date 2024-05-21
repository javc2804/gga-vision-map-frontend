import { API_URL } from "./index";

export const purchaseService = {
  getCombinedData: () => {
    return API_URL.get("combinedData")
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },

  savePurchase: (purchaseData: any) => {
    console.log(purchaseData);
    return API_URL.post("transaction", purchaseData)
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
  saveCompromise: (compromiseData: any) => {
    return API_URL.post("transaction", compromiseData)
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
};
