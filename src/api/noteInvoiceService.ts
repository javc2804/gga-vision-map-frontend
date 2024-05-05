import { API_URL } from "./index";

export const noteInvoiceService = {
  getNoteInvoices: () => {
    return API_URL.get("note-invoices")
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
};
