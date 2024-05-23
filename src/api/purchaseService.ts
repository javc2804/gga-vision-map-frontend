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
  getCompromise: (id: any) => {
    return API_URL.post("transaction/compromise", { id })
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
  getPurchase: (id: any) => {
    return API_URL.post("transaction/get-transaction", { id })
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },

  savePurchase: (purchaseData: any) => {
    return API_URL.post("transaction", purchaseData)
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
  savePurchaseAsing: (purchaseData: any) => {
    return API_URL.post("transaction/asing", purchaseData)
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
  savePurchaseUpdateComprimise: (purchaseData: any) => {
    console.log(purchaseData);
    return API_URL.post("transaction/trans-compromise", purchaseData)
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
  saveCompromise: (compromiseData: any) => {
    return API_URL.post("transaction/new-compromise", compromiseData)
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
};
