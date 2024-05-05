import { API_URL } from "./index";

export const purchaseService = {
  getPurchase: () => {
    return API_URL.get("combinedData")
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },

  savePurchase: (purchaseData: any) => {
    console.log(purchaseData.invoices);
    return API_URL.post("transaction", purchaseData.invoices)
      .then((response) => {
        console.log(response);

        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
};
