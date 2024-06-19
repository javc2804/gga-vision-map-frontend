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
  deletePurchase: (ids: any) => {
    return API_URL.post("transaction/delete", ids)
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
  getDownloadInvoice: (invoiceData) => {
    console.log("entr");

    return API_URL.post(`note-invoices/download-invoice`, invoiceData, {
      responseType: "arraybuffer", // Cambia esto a 'arraybuffer'
      headers: {
        Accept: "application/pdf", // Asegúrate de que axios solicita un PDF
      },
    })
      .then((response) => {
        console.log(response);

        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "invoice.pdf");
        document.body.appendChild(link);
        link.click();

        // Cleanup: remove the link after triggering the download
        document.body.removeChild(link);

        return { ok: true };
      })
      .catch((error) => {
        console.log(error);

        // Handle error: check if error.response and error.response.data.msg exist
        const errorMsg =
          error.response && error.response.data.msg
            ? error.response.data.msg
            : "Unknown error";
        return { ok: false, response: errorMsg };
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
        link.setAttribute("download", "plantilla.xlsm"); // o el nombre del archivo que desees
        document.body.appendChild(link);
        link.click();
        return { ok: true };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
  getDataGraphsOut: (compromiseData: any) => {
    return API_URL.get(`graphs-out`, {
      params: {
        ...compromiseData,
      },
    })
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
};
