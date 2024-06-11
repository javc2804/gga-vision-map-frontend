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
  editPurchase: (purchaseData: any) => {
    console.log(purchaseData);
    return API_URL.post("transaction/edit-purchase", purchaseData)
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
  getListPurchase: (
    compromiseData: any,
    page: number,
    limit: number,
    offset: number
  ) => {
    return API_URL.get(`transaction/list`, {
      params: {
        ...compromiseData,
        offset: offset || 0,
        limit,
      },
    })
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
  getExportPurchase: (dataFilters: any) => {
    return API_URL.get(`transaction/export`, {
      params: {
        dataFilters,
      },
      responseType: "blob", // tell axios to download the response as a blob
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "reporte.xls");
        document.body.appendChild(link);
        link.click();
        return { ok: true };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
  importPurchase: (file: any) => {
    return API_URL.post(`/upload/matriz`, file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response: any) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },

  getTemplateDownload: () => {
    return API_URL.get("download-template", { responseType: "blob" })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "matriz.xlsm"); // o el nombre del archivo que desees
        document.body.appendChild(link);
        link.click();
        return { ok: true };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
};
