// noteInvoicesThunks.ts

import { AppThunk } from "../../store/notes/noteInvoicesSlice";
import {
  getNoteInvoicesStart,
  getNoteInvoicesSuccess,
  getNoteInvoicesFailure,
} from "./noteInvoicesSlice";
import { noteInvoiceService } from "../../api/noteInvoiceService";

export const fetchNoteInvoices =
  (page = 1, limit = 5): AppThunk =>
  async (dispatch) => {
    dispatch(getNoteInvoicesStart());
    try {
      const response = await noteInvoiceService.getNoteInvoices(page, limit);

      if (response.ok) {
        dispatch(getNoteInvoicesSuccess(response.response.noteInvoices));
      } else {
        dispatch(getNoteInvoicesFailure(response.response.noteInvoices));
      }
    } catch (error) {
      dispatch(getNoteInvoicesFailure(error.toString()));
    }
  };
