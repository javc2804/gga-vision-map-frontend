// noteInvoicesThunks.ts

import { AppThunk } from "../../store/notes/noteInvoicesSlice";
import {
  getNoteInvoicesStart,
  getNoteInvoicesSuccess,
  getNoteInvoicesFailure,
} from "./noteInvoicesSlice";
import { noteInvoiceService } from "../../api/noteInvoiceService";

export const fetchNoteInvoices = (): AppThunk => async (dispatch) => {
  dispatch(getNoteInvoicesStart());
  try {
    const response = await noteInvoiceService.getNoteInvoices();
    if (response.ok) {
      dispatch(getNoteInvoicesSuccess(response.response));
    } else {
      dispatch(getNoteInvoicesFailure(response.response));
    }
  } catch (error) {
    dispatch(getNoteInvoicesFailure(error.toString()));
  }
};
