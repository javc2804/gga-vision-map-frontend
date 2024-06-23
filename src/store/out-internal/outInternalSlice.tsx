import { createSlice } from "@reduxjs/toolkit";
export const outInternalSlice = createSlice({
  name: "out-internal",
  initialState: {
    loading: true,
    list: {},
  },
  reducers: {
    createOutInternal: (state, { payload }) => {},
    getListOutInternal: (state, { payload }) => {
      state.list = payload;
    },
  },
});

export const { createOutInternal, getListOutInternal } =
  outInternalSlice.actions;
