import { createSlice } from "@reduxjs/toolkit";
export const compromisesSlice = createSlice({
  name: "compromises",
  initialState: {
    compromise: {},
  },
  reducers: {
    getCompromise: (state, { payload }) => {
      state.compromise = payload;
    },
  },
});

export const { getCompromise } = compromisesSlice.actions;
